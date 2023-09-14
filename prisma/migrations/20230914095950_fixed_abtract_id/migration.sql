/*
  Warnings:

  - You are about to drop the column `abstactId` on the `awards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `awards` DROP FOREIGN KEY `awards_abstactId_fkey`;

-- AlterTable
ALTER TABLE `awards` DROP COLUMN `abstactId`,
    ADD COLUMN `abstractId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `awards` ADD CONSTRAINT `awards_abstractId_fkey` FOREIGN KEY (`abstractId`) REFERENCES `abstract`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
