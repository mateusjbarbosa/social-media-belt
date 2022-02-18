import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "next-auth/react"

import { Link, Prisma } from "@prisma/client";

import prisma from "lib/prisma";

import { findPaginated, LinkPaginationWrapper, saveLink } from 'services/links'

type SessionError = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Link | LinkPaginationWrapper | SessionError>
) {
  const session = await getSession({ req })

  if (session) {
    const tenantId = String(req.query.tenantId)

    if (req.method === 'POST') {
      const data: Prisma.LinkCreateInput = {
        name: String(req.body.name),
        publicName: String(req.body.publicName),
        slug: String(req.body.slug),
        destination: String(req.body.destination),
        tenant: {
          connect: {
            id: tenantId
          }
        }
      }

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

      console.log(data)

      const savedLink = await saveLink(data)

      console.log(savedLink)

      res.send(savedLink)
    }

    const { cursor, take } = req.query

    const links = await findPaginated(tenantId, cursor, take)

    res.send(links)
  } else {
    res.send({ message: "You must be sign in to view the protected content on this page." })
  }
}