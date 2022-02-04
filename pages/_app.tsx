import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import LayoutApp from 'components/Layouts/LayoutApp'
import LayoutPublic from 'components/Layouts/LayoutPublic'
import LayoutTenant from 'components/Layouts/LayoutTenant'

import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  const router = useRouter()
  const { pathname } = router

  let Layout = undefined

  function verifyPathname(match: string): boolean {
    return pathname.indexOf(match) === 0
  }

  if (verifyPathname('/app')) {
    Layout = LayoutApp
  } else if (verifyPathname('/[slug]')) {
    Layout = LayoutTenant
  } else {
    Layout = LayoutPublic
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
