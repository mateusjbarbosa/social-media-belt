import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const LayoutTenant = ({ children }: Props) => (
  <>
    <h1>Tenant Layout</h1>
    {children}
  </>
)

export default LayoutTenant