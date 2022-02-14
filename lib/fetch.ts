type PostProps<T> = {
  url: string
  data: T
}

export async function fetchPost<T>({ url, data }: PostProps<T>) {
  const result = await fetch(
    url,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )

  return result.json()
}

type DeleteProps = {
  url: string
}

export const fetchDelete = async ({ url }: DeleteProps) => {
  const result = await fetch(
    url,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    }
  )

  return result.json()
}