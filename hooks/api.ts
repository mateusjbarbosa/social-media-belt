import useSWR from 'swr'

const fetcher = (...args: any[]) => fetch(...args).then(res => res.json())

export function useGet<T>(url?: string) {
  return useSWR<T>(url, fetcher)
}