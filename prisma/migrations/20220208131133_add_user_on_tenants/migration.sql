-- CreateTable
CREATE TABLE "user_on_tenants" (
    "user_id" TEXT NOT NULL,
    "tenant_id" TEXT NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_on_tenants_pkey" PRIMARY KEY ("user_id","tenant_id")
);

-- AddForeignKey
ALTER TABLE "user_on_tenants" ADD CONSTRAINT "user_on_tenants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_on_tenants" ADD CONSTRAINT "user_on_tenants_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
