import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@geist-ui/react";

class Document extends NextDocument {
  render() {
    const styles = CssBaseline.flush()

    return (
      <Html lang="en">
        <Head>
          {/* Primary Meta Tags */}
          <title>KYVE</title>
          <meta name="title" content="KYVE" />
          <meta
            name="description"
            content="The unified archive for blockchains."
          />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://kyve.network/" />
          <meta property="og:title" content="KYVE" />
          <meta
            property="og:description"
            content="The unified archive for blockchains."
          />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://kyve.network/" />
          <meta property="twitter:title" content="KYVE" />
          <meta
            property="twitter:description"
            content="The unified archive for blockchains."
          />

          <link
            rel="icon"
            href="https://kyve.network/favicon.svg"
            type="image/svg"
          />
          <meta property="og:image" content="https://kyve.network/og.png" />
          <meta
            property="twitter:image"
            content="https://kyve.network/og.png"
          />

          {styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
