/*
  Warnings:

  - Made the column `reference` on table `purchase_requests` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `purchase_requests` MODIFY `reference` VARCHAR(191) NOT NULL,
    MODIFY `type` ENUM('SVP', 'BIDDING', 'REORDER', 'DIRECT') NOT NULL DEFAULT 'SVP';

-- CreateTable
CREATE TABLE `supplier_rating` (
    `id` VARCHAR(191) NOT NULL,
    `supplier` VARCHAR(191) NOT NULL,
    `selection` INTEGER NOT NULL DEFAULT 0,
    `onTime` INTEGER NOT NULL DEFAULT 0,
    `delays` INTEGER NOT NULL DEFAULT 0,
    `extends` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `supplier_rating_supplier_key`(`supplier`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `supplier_rating` ADD CONSTRAINT `supplier_rating_supplier_fkey` FOREIGN KEY (`supplier`) REFERENCES `suppliers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
