/*
  Warnings:

  - You are about to drop the column `auth_token_secret` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "auth_token_secret",
ADD COLUMN     "oauth_token_secret" TEXT;
