import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const LayoutEmpty = ({ children }: Props) => (
  <>
    {children}
  </>
)

export default LayoutEmpty