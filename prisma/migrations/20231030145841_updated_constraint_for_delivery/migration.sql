/*
  Warnings:

  - Made the column `prId` on table `delivery` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `delivery` DROP FOREIGN KEY `delivery_prId_fkey`;

-- AlterTable
ALTER TABLE `delivery` MODIFY `prId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `purchase_requests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
