import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from 'lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // @ts-ignore
      scope: "read:user",
    })
  ],
  secret: process.env.SECRET,
  session: { strategy: 'jwt' },
  jwt: { secret: process.env.JWT_SECRET },
  pages: {},
  callbacks: {
    async session({ session, token }) {
      // @ts-ignore
      session.user.id = token.sub

      return session
    },
    async jwt({ token, user, isNewUser }) {
      if (isNewUser) {
        const accounts = await prisma.tenant.findFirst({
          where: {
            users: {
              some: {
                userId: user?.id
              }
            }
          }
        })

        if (!accounts) {
          const tenant = await prisma.tenant.create({
            data: {
              name: 'First Tenant',
              image: '',
              slug: 'first_tenant',
              plan: 'free'
            }
          })

          await prisma.userOnTenants.create({
            data: {
              // @ts-ignore
              userId: user.id,
              tenantId: tenant.id,
              role: 'owner'
            }
          })
        }
      }

      return token
    }
  },
  events: {},
  debug: false,
})