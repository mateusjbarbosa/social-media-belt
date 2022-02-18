import { Link, Prisma } from "@prisma/client"

import prisma from "lib/prisma";

export type LinkPaginationWrapper = {
  items: Link[]
  nextCursor: string
  prevCursor: string
}

export async function saveLink(data: Prisma.LinkCreateInput): Promise<Link> {
  return await prisma.link.create({ data })
}

export async function findPaginated(
  tenantId: string,
  cursor?: string | string[],
  take?: string | string[]
): Promise<LinkPaginationWrapper> {
  const takeNumber: number = Number(take || 5)

  const args: Prisma.LinkFindManyArgs = {
    where: {
      tenantId: {
        equals: tenantId
      }
    },
    take: takeNumber,
    orderBy: {
      name: 'asc'
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
        gt: links?.[links.length - 1]?.id // greater than
      }
    },
    orderBy: {
      name: 'asc'
    }
  })
  const prevCursor = await prisma.link.findMany({
    select: {
      id: true
    },
    where: {
      id: {
        lt: links?.[0]?.id // less than
      }
    },
    take: takeNumber,
    orderBy: {
      name: 'desc'
    }
  })

  return {
    items: links,
    nextCursor: nextCursor?.id || '',
    prevCursor: prevCursor?.[prevCursor.length - 1]?.id || ''
  }
}
