import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accounts = await prisma.account.findMany()

  res.status(200).json(accounts)
}