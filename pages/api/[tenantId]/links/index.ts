import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"

import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })


  if (session) {
    const tenantId = String(req.query.tenantId)

    if (req.method === 'POST') {
      const data = { ...req.body, tenantId }

      const savedLink = await prisma.link.create({ data })

      res.send(savedLink)
    }

    const links = await prisma.link.findMany({
      where: {
        tenantId: {
          equals: tenantId
        }
      }
    })

    res.send(links)
  } else {
    res.send("You must be sign in to view the protected content on this page.")
  }
}