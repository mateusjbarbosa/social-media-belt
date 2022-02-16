import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"

import { Link, Prisma } from "@prisma/client";
import prisma from "lib/prisma";

export type PaginationWrapper<T> = {
  items: T
  nextCursor: string
  prevCursor: string
}

async function getPaginatedLinks(tenantId: string, cursor: string, take: number): Promise<PaginationWrapper<Link[]>> {
  const takeNumber: number = Number(take || 5)

  const args: Prisma.LinkFindManyArgs = {
    where: {
      tenantId: {
        equals: tenantId
      }
    },
    take: takeNumber,
    orderBy: {
      id: 'asc'
    }
  }

  if (cursor) {
    args.cursor = {
      id: String(cursor)
    }
  }

  const links = await prisma.link.findMany(args)
  const nextCursor = await prisma.link.findFirst({
    select: {
      id: true
    },
    where: {
      id: {
        gt: links[links.length - 1].id // greater than
      }
    },
    orderBy: {
      id: 'asc'
    }
  })
  const prevCursor = await prisma.link.findMany({
    select: {
      id: true
    },
    where: {
      id: {
        lt: links[0].id // less than
      }
    },
    take: takeNumber,
    orderBy: {
      id: 'desc'
    }
  })

  return {
    items: links,
    nextCursor: nextCursor?.id || '',
    prevCursor: prevCursor?.[prevCursor.length - 1].id || ''
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Link | PaginationWrapper<Link[]> | string>
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

    // get paginated links
  } else {
    res.send("You must be sign in to view the protected content on this page.")
  }
}