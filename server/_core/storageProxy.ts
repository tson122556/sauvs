import type { Express } from "express";
import { ENV } from "./env";

/**
 * Resolve /manus-storage/* asset paths to short-lived signed storage URLs.
 *
 * The frontend stores only stable object keys. Credentials stay on the server,
 * and browsers are redirected to the signed URL returned by Forge.
 */
export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string | undefined>)["0"];

    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(500).send("Storage proxy not configured");
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        `${ENV.forgeApiUrl.replace(/\/+$/, "")}/`,
      );
      forgeUrl.searchParams.set("path", key);

      const forgeResponse = await fetch(forgeUrl, {
        headers: {
          Authorization: `Bearer ${ENV.forgeApiKey}`,
        },
      });

      if (!forgeResponse.ok) {
        const body = await forgeResponse.text().catch(() => "");
        console.error(
          `[StorageProxy] Forge returned ${forgeResponse.status}: ${body}`,
        );
        res.status(502).send("Storage backend error");
        return;
      }

      const payload = (await forgeResponse.json()) as { url?: string };
      if (!payload.url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      res.set("Cache-Control", "no-store");
      res.redirect(307, payload.url);
    } catch (error) {
      console.error("[StorageProxy] Failed to create signed URL:", error);
      res.status(502).send("Storage proxy error");
    }
  });
}
