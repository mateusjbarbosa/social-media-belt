import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Subtitle = ({ children }: Props) => (
  <h2 className="text-md text-gray-400">{children}</h2>
)

export default Subtitle