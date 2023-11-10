/*
  Warnings:

  - You are about to drop the column `supplier` on the `supplier_rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supplierId]` on the table `supplier_rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supplierId` to the `supplier_rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `supplier_rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `supplier_rating` DROP FOREIGN KEY `supplier_rating_supplier_fkey`;

-- AlterTable
ALTER TABLE `supplier_rating` DROP COLUMN `supplier`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `supplierId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `supplier_rating_supplierId_key` ON `supplier_rating`(`supplierId`);

-- AddForeignKey
ALTER TABLE `supplier_rating` ADD CONSTRAINT `supplier_rating_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
