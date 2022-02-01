import type { NextPage } from 'next'
import Link from 'next/link'

import SEOComponent from 'components/SEO'

const Home: NextPage = () => {
  return (
    <>
      <SEOComponent title="Social Media Belt" description="Social Media Belt" />

      <ul>
        <li><Link href="/app">App</Link></li>
        <li><Link href="/tenant">Tenant</Link></li>
      </ul>
    </>
  )
}

export default Home
