/*
  Warnings:

  - Added the required column `parcels` to the `delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `delivery` ADD COLUMN `parcels` JSON NOT NULL;
