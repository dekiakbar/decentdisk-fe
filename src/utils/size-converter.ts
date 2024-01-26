export const convertSize = (bytes: number): string => {
  const sizes = ["B", "KB", "MB", "GB"];
  let index = 0;

  while (bytes >= 1000 && index < sizes.length - 1) {
    bytes /= 1000;
    index++;
  }

  const size =
    index === sizes.length - 1
      ? bytes.toFixed(2) + sizes[index]
      : bytes.toFixed(2) + sizes[index];

  return size;
};
