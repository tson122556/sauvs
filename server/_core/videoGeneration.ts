/**
 * Video generation helper using internal VideoService
 * 
 * Supports generating videos from text prompts, images, or audio
 * 
 * Example usage:
 *   const { url: videoUrl } = await generateVideo({
 *     prompt: "A cinematic scene of a spaceship flying through stars",
 *     duration: 10
 *   });
 */
import { storagePut } from "server/storage";
import { ENV } from "./env";

export type GenerateVideoOptions = {
  prompt: string;
  duration?: number; // seconds, default 5
  fps?: number; // frames per second, default 24
  resolution?: "720p" | "1080p" | "4k"; // default 1080p
  style?: string; // artistic style
};

export type GenerateVideoResponse = {
  url?: string;
  duration?: number;
  resolution?: string;
};

export async function generateVideo(
  options: GenerateVideoOptions
): Promise<GenerateVideoResponse> {
  if (!ENV.forgeApiUrl) {
    throw new Error("BUILT_IN_FORGE_API_URL is not configured");
  }
  if (!ENV.forgeApiKey) {
    throw new Error("BUILT_IN_FORGE_API_KEY is not configured");
  }

  // Build the full URL by appending the service path to the base URL
  const baseUrl = ENV.forgeApiUrl.endsWith("/")
    ? ENV.forgeApiUrl
    : `${ENV.forgeApiUrl}/`;
  const fullUrl = new URL(
    "videos.v1.VideoService/GenerateVideo",
    baseUrl
  ).toString();

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "connect-protocol-version": "1",
        authorization: `Bearer ${ENV.forgeApiKey}`,
      },
      body: JSON.stringify({
        prompt: options.prompt,
        duration: options.duration || 5,
        fps: options.fps || 24,
        resolution: options.resolution || "1080p",
        style: options.style,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(
        `Video generation request failed (${response.status} ${response.statusText})${detail ? `: ${detail}` : ""}`
      );
    }

    const result = (await response.json()) as {
      video: {
        b64Json?: string;
        url?: string;
        mimeType?: string;
      };
    };

    let videoUrl = result.video.url;

    // If video is returned as base64, save to S3
    if (result.video.b64Json && !videoUrl) {
      const base64Data = result.video.b64Json;
      const buffer = Buffer.from(base64Data, "base64");

      const uploadResult = await storagePut(
        `generated/videos/${Date.now()}.mp4`,
        buffer,
        result.video.mimeType || "video/mp4"
      );
      videoUrl = uploadResult.url;
    }

    return {
      url: videoUrl,
      duration: options.duration || 5,
      resolution: options.resolution || "1080p",
    };
  } catch (error) {
    console.error("Video generation error:", error);
    throw error;
  }
}
