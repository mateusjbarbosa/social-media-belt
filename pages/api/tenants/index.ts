import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"

import prisma from "lib/prisma";
import { Tenant } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Tenant[] | string>) {
  const session = await getSession({ req })

  if (session) {
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
    res.send(tenants)
  } else {
    res.send("You must be sign in to view the protected content on this page.")
  }
}