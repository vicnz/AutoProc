/*
  Warnings:

  - A unique constraint covering the columns `[prId]` on the table `abstract` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prId]` on the table `awards` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prId]` on the table `price_quotations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prId]` on the table `recommendation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `abstract_prId_key` ON `abstract`(`prId`);

-- CreateIndex
CREATE UNIQUE INDEX `awards_prId_key` ON `awards`(`prId`);

-- CreateIndex
CREATE UNIQUE INDEX `price_quotations_prId_key` ON `price_quotations`(`prId`);

-- CreateIndex
CREATE UNIQUE INDEX `recommendation_prId_key` ON `recommendation`(`prId`);
