-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEPOSIT', 'WITHDRAW', 'TRANSFER');

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_fromAccountId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_toAccountId_fkey";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "type" "TransactionType" NOT NULL DEFAULT 'DEPOSIT',
ALTER COLUMN "fromAccountId" DROP NOT NULL,
ALTER COLUMN "toAccountId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "transactions_fromAccountId_idx" ON "transactions"("fromAccountId");

-- CreateIndex
CREATE INDEX "transactions_toAccountId_idx" ON "transactions"("toAccountId");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
