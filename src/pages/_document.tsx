import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const title = process.env.NEXT_PUBLIC_APP_NAME;
  const description = process.env.NEXT_PUBLIC_META_DESCRIPTION;
  const keywords = process.env.NEXT_PUBLIC_META_KEYWORDS;
  const url = process.env.NEXT_PUBLIC_META_URL;
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags  */}
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/opengraph/og.png" />

        {/* Twitter  */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="/images/opengraph/og.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
