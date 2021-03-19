import Document, { Head, Main, NextScript, Html } from 'next/document'

class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='theme-color' content='#000000' />
          <link
            href='https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
            rel='stylesheet'
          />
        </Head>

        <body>
          <div id='page-transition'></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
