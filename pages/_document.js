import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  const meta = {
    title: '喷气松鼠 Jet Squirrel',
    description: 'Jet Me to The Moon',
    image: 'https://assets.vercel.com/image/upload/q_auto/front/vercel/dps.png'
  }

  return (
    <Html lang="zh">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jetsuirrel2048" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
