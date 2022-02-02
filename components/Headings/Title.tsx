import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Title = ({ children }: Props) => (
  <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">{children}</h1>
)

export default Title