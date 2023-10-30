-- AlterTable
ALTER TABLE `delivery` ADD COLUMN `prId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `purchase_requests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
