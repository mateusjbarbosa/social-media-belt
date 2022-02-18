import { useEffect, useState } from 'react';

import Link from 'next/link'
import { useRouter } from 'next/router';

import { useSession } from 'next-auth/react'

import { Tenant } from "@prisma/client";

import { useGet } from 'hooks/api';

const App = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const { data: session } = useSession()
  const { data, error } = useGet<Tenant[]>('/api/tenants')
  const router = useRouter()

  useEffect(() => {
    if (data && data.length === 1) {
      setShouldRedirect(true)
    }
  }, [data, router])

  useEffect(() => {
    if (data && data.length === 1 && setShouldRedirect) {
      setTimeout(() => {
        router.push(`/app/${data[0].id}`)
      }, 3000)

      setShouldRedirect(false)
    }
  }, [data, router, setShouldRedirect])

  return (
    <div className='max-w-lg mx-auto text-center my-6'>
      <img
        className='rounded-full w-16 inline-block'
        src={session?.user?.image}
        alt={session?.user?.name}
      />
      <h1>{session?.user?.name}</h1>
      <div className='mt-6'>
        {data && data.map((tenant: Tenant) => (
          <Link key={tenant.id} href={`/app/${tenant.id}`}>
            <a
              className='inline-block text-center border text-base font-medium rounded text-black bg-white 
            hover:bg-gray-100 px-4 py-2'
            >
              {tenant.name}
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default App