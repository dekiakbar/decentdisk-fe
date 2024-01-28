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

export function isSupportedByReactPlayer(mimeType: string): boolean {
  const SupportedType: Array<string> = ["video/mp4", "audio/mpeg"];
  return SupportedType.includes(mimeType);
}

export function isImage(mimeType: string): boolean {
  const imageType: Array<string> = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/webp",
  ];

  return imageType.includes(mimeType);
}
