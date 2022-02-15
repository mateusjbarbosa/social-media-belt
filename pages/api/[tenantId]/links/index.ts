import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"

import { Link } from "@prisma/client";
import prisma from "lib/prisma";

export type PaginationWrapper<T> = {
  cursor: string
  take: number
  items: T[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Link | PaginationWrapper<Link> | string>
) {
  const session = await getSession({ req })

  if (session) {
    const tenantId = String(req.query.tenantId)

    if (req.method === 'POST') {
      const data = { ...req.body, tenantId }

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

      const savedLink = await prisma.link.create({ data })

      res.send(savedLink)
    }

    const { cursor, take } = req.query
    let links = []

    if (cursor) {
      links = await prisma.link.findMany({
        where: {
          tenantId: {
            equals: tenantId
          }
        },
        cursor: {
          id: String(cursor)
        },
        skip: 1,
        take: Number(take || 10),
        orderBy: {
          id: 'asc'
        }
      })
    } else {
      links = await prisma.link.findMany({
        where: {
          tenantId: {
            equals: tenantId
          }
        },
        take: Number(take || 10),
        orderBy: {
          id: 'asc'
        }
      })
    }

    res.send({
      cursor: '',
      take: 5,
      items: links
    })
  } else {
    res.send("You must be sign in to view the protected content on this page.")
  }
}