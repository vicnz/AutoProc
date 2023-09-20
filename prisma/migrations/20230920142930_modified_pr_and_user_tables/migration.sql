/*
  Warnings:

  - You are about to drop the column `prId` on the `monitor` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_date` on the `po` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_duration` on the `po` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_location` on the `po` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_term` on the `po` table. All the data in the column will be lost.
  - You are about to drop the column `issue_date` on the `po` table. All the data in the column will be lost.
  - You are about to drop the column `payment_term` on the `po` table. All the data in the column will be lost.
  - You are about to drop the column `issue_date` on the `pr` table. All the data in the column will be lost.
  - Added the required column `d_date` to the `po` table without a default value. This is not possible if the table is not empty.
  - Added the required column `d_payment` to the `po` table without a default value. This is not possible if the table is not empty.
  - Added the required column `d_term` to the `po` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `monitor` DROP FOREIGN KEY `monitor_prId_fkey`;

-- DropIndex
DROP INDEX `pr_pr_no_reference_idx` ON `pr`;

-- AlterTable
ALTER TABLE `monitor` DROP COLUMN `prId`;

-- AlterTable
ALTER TABLE `po` DROP COLUMN `delivery_date`,
    DROP COLUMN `delivery_duration`,
    DROP COLUMN `delivery_location`,
    DROP COLUMN `delivery_term`,
    DROP COLUMN `issue_date`,
    DROP COLUMN `payment_term`,
    ADD COLUMN `d_date` DATETIME(3) NOT NULL,
    ADD COLUMN `d_duration` INTEGER NOT NULL DEFAULT 3,
    ADD COLUMN `d_location` VARCHAR(191) NULL,
    ADD COLUMN `d_payment` VARCHAR(191) NOT NULL,
    ADD COLUMN `d_term` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `pr` DROP COLUMN `issue_date`,
    ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` ADD COLUMN `sectionId` VARCHAR(191) NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `pr_pr_no_reference_sai_obr_idx` ON `pr`(`pr_no`, `reference`, `sai`, `obr`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `sections`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
