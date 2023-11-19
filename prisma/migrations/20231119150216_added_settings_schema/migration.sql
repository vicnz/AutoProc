/*
  Warnings:

  - You are about to drop the column `particulars` on the `settings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `settings` DROP COLUMN `particulars`,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `settings_name_key` ON `settings`(`name`);
