import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class CustomDocument extends Document {
  render() {
    const loadMjx = this.props.__NEXT_DATA__.page === '/playground/[qid]';

    return (
      <Html>
        <Head>
          <Script async id="MathJax-config" strategy="beforeInteractive" src={loadMjx ? '/js/mathjax_config.js' : ''} />
          <Script
            async
            id="MathJax-script"
            strategy="beforeInteractive"
            src={loadMjx ? 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js' : ''}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
