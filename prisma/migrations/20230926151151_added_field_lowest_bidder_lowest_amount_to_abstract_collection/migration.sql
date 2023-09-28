/*
  Warnings:

  - You are about to drop the column `lowest_bidder` on the `awards` table. All the data in the column will be lost.
  - You are about to drop the column `lowest_cost` on the `awards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `abstract` ADD COLUMN `lowestAmount` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    ADD COLUMN `lowestBidder` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `awards` DROP COLUMN `lowest_bidder`,
    DROP COLUMN `lowest_cost`;
