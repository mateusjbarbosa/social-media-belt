import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const LayoutPublic = ({ children }: Props) => (
  <>
    <h1>Public Layout</h1>
    {children}
  </>
)

export default LayoutPublic