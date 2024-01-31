/**
 * See on backend code : backend/src/file/service/file.service.ts::generateInternalCid()
 * @param internalCid
 */
export function decodeMimeType(internalCid: string): string {
  if (!internalCid) {
    throw Error("internalCid can't be null or undefined");
  }

  if (!internalCid.includes("-")) {
    throw Error("missing separator on internalCid");
  }

  const encodedMime = internalCid.split("-");
  const mimeType = Buffer.from(encodedMime[0], "base64").toString("utf-8");

  return mimeType;
}

/**
 * Unsupported video:
 * - video/x-ms-wmv
 * - video/x-msvideo
 * - video/3gpp
 *
 * @param {string} mimeType string mimeType
 *
 * @returns {string}
 */
export function isSupportedByReactPlayer(mimeType: string): boolean {
  const supportedType: Array<string> = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "audio/ogg",
    "video/quicktime",
    "audio/mpeg",
  ];

  return supportedType.includes(mimeType);
}

/**
 *
 * @param {string} mimeType string mimeType
 *
 * @returns {string}
 */
export function isImage(mimeType: string): boolean {
  const imageType: Array<string> = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
    "image/vnd.microsoft.icon",
    "image/svg+xml",
  ];

  return imageType.includes(mimeType);
}
