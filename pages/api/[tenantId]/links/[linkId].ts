import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"

import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })


  if (session) {
    const tenantId = String(req.query.tenantId)
    const linkId = String(req.query.linkId)

    if (req.method === 'DELETE') {
      const tenants = await prisma.tenant.findMany({
        where: {
          users: {
            some: {
              // @ts-ignore
              userId: session.user.id
            }
          }
        }
      })

      await prisma.link.delete({ where: { id: linkId } })

      res.send({ id: linkId, success: true })
    }

    res.send({ id: linkId, success: false })
  } else {
    res.send("You must be sign in to view the protected content on this page.")
  }
}