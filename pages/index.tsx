import type { NextPage } from 'next'
import Link from 'next/link'

import { signIn, signOut, useSession } from 'next-auth/react'

import SEOComponent from 'components/SEO'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <SEOComponent title="Social Media Belt" description="Social Media Belt" />

      <ul>
        <li><Link href="/app">App</Link></li>
        <li><Link href="/tenant">Tenant</Link></li>
      </ul>

      {session ?
        <>
          <p>Signed in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
          <br />
        </>
        : <button onClick={() => signIn()}>Sign in</button>
      }
    </>
  )
}

export default Home
