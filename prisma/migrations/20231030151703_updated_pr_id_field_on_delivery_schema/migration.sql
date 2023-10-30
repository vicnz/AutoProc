/*
  Warnings:

  - A unique constraint covering the columns `[prId]` on the table `delivery` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `delivery_prId_key` ON `delivery`(`prId`);
