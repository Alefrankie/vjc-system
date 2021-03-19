import PageChange from 'components/PageChange/PageChange'
import { InvoiceProvider, UserProvider } from 'context'
import Head from 'next/head'
import Router from 'next/router'
import '../../public/sass/styles.sass'
import ReactDOM from 'react-dom'
// import type { AppProps } from 'next/app'

//https://demos.creative-tim.com/nextjs-argon-dashboard-pro/admin/tables

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  document.body.classList.add('body-page-transition')
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById('page-transition')
  )
})

Router.events.on('routeChangeComplete', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'))
  document.body.classList.remove('body-page-transition')
})

Router.events.on('routeChangeError', () => {
  ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'))
  document.body.classList.remove('body-page-transition')
})

export default function App ({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>)

  return (
    <>
      <Head>
        <title>Inv. VJC Import C.A</title>
        <link rel='icon' type='image/x-icon' href='/img/favicon.ico' />
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width,  shrink-to-fit=no'
        />
      </Head>

      <UserProvider>
        <InvoiceProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </InvoiceProvider>
      </UserProvider>
    </>
  )
}
