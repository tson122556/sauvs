import type { Express, Request, Response } from "express";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("./env", () => ({
  ENV: {
    forgeApiUrl: "https://forge.example.test",
    forgeApiKey: "test-forge-key",
  },
}));

import { registerStorageProxy } from "./storageProxy";

type RouteHandler = (req: Request, res: Response) => Promise<void>;

function captureHandler() {
  let handler: RouteHandler | undefined;
  const app = {
    get: vi.fn((path: string, routeHandler: RouteHandler) => {
      expect(path).toBe("/manus-storage/*");
      handler = routeHandler;
    }),
  } as unknown as Express;

  registerStorageProxy(app);
  expect(handler).toBeDefined();
  return handler!;
}

function createResponse() {
  const response = {
    status: vi.fn(),
    send: vi.fn(),
    set: vi.fn(),
    redirect: vi.fn(),
  };
  response.status.mockReturnValue(response);
  return response as unknown as Response & {
    status: ReturnType<typeof vi.fn>;
    send: ReturnType<typeof vi.fn>;
    set: ReturnType<typeof vi.fn>;
    redirect: ReturnType<typeof vi.fn>;
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("registerStorageProxy", () => {
  it("redirects a storage key to the signed Forge URL", async () => {
    const signedUrl = "https://cdn.example.test/signed-image.png";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ url: signedUrl }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const handler = captureHandler();
    const response = createResponse();
    const request = {
      params: { 0: "blackrock-logo_c3abfa75.png" },
    } as unknown as Request;

    await handler(request, response);

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, options] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(url.toString()).toBe(
      "https://forge.example.test/v1/storage/presign/get?path=blackrock-logo_c3abfa75.png",
    );
    expect(options.headers).toEqual({
      Authorization: "Bearer test-forge-key",
    });
    expect(response.set).toHaveBeenCalledWith("Cache-Control", "no-store");
    expect(response.redirect).toHaveBeenCalledWith(307, signedUrl);
  });

  it("rejects an empty storage key", async () => {
    const handler = captureHandler();
    const response = createResponse();
    const request = { params: {} } as unknown as Request;

    await handler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith("Missing storage key");
  });
});
