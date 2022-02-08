/*
  Warnings:

  - The primary key for the `tenants` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "tenants" DROP CONSTRAINT "tenants_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "tenants_id_seq";
