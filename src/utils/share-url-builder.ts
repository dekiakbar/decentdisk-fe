export function facebookLink(url: string) {
  const shareUrl = `https://facebook.com/sharer/sharer.php?u=${getStreamUrl(
    url
  )}`;
  return shareUrl;
}

export function linkedinLink(url: string) {
  const title = process.env.NEXT_PUBLIC_APP_NAME || "";
  const summary = process.env.NEXT_PUBLIC_META_DESCRIPTION || "";
  const result = `https://www.linkedin.com/shareArticle?mini=true&url=${getStreamUrl(
    url
  )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
    summary
  )}&source=${getStreamUrl(url)}`;

  return result;
}

export function whatsappLink(url: string) {
  const message = process.env.NEXT_PUBLIC_META_DESCRIPTION || "";
  return `whatsapp://send?text=${encodeURIComponent(message)}%20${getStreamUrl(
    url
  )}`;
}

export function telegramShare(url: string) {
  const summary = process.env.NEXT_PUBLIC_META_DESCRIPTION || "";
  const telegramUrl = `https://telegram.me/share/url?text=${encodeURIComponent(
    summary
  )}&url=${getStreamUrl(url)}`;
  return telegramUrl;
}

export function getStreamUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_META_URL || "";
  return `${baseUrl}/${url}`;
}
