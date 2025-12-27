/*
  Warnings:

  - You are about to drop the column `catgeoryId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categeoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_catgeoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "catgeoryId",
ADD COLUMN     "categeoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categeoryId_fkey" FOREIGN KEY ("categeoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
