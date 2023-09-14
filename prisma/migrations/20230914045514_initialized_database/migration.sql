-- CreateTable
CREATE TABLE `departments` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    FULLTEXT INDEX `departments_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sections` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `departmentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    FULLTEXT INDEX `sections_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `userType` ENUM('ADMIN', 'USER', 'UTIL') NOT NULL DEFAULT 'USER',
    `password` VARCHAR(191) NOT NULL,
    `fname` VARCHAR(191) NOT NULL,
    `mname` VARCHAR(191) NULL,
    `lname` VARCHAR(191) NULL,
    `suffix` VARCHAR(191) NULL,
    `profile` MEDIUMBLOB NULL,
    `departmentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    FULLTEXT INDEX `users_username_email_fname_lname_idx`(`username`, `email`, `fname`, `lname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pr` (
    `id` VARCHAR(191) NOT NULL,
    `pr_no` VARCHAR(191) NULL,
    `sai` VARCHAR(191) NULL,
    `obr` VARCHAR(191) NULL,
    `issue_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reference` VARCHAR(191) NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `enduserId` VARCHAR(191) NULL,
    `particulars` JSON NOT NULL,
    `tracking` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pr_pr_no_key`(`pr_no`),
    FULLTEXT INDEX `pr_pr_no_reference_idx`(`pr_no`, `reference`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recommendation` (
    `id` VARCHAR(191) NOT NULL,
    `tracking` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `prId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `price_quotations` (
    `id` VARCHAR(191) NOT NULL,
    `suppliers` JSON NOT NULL,
    `tracking` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `prId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `abstract` (
    `id` VARCHAR(191) NOT NULL,
    `quotations` JSON NOT NULL,
    `biddingPlace` VARCHAR(191) NULL,
    `tracking` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `prId` VARCHAR(191) NOT NULL,
    `rfqId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `awards` (
    `id` VARCHAR(191) NOT NULL,
    `lowest_bidder` VARCHAR(191) NULL,
    `lowest_cost` DECIMAL(65, 30) NULL,
    `tracking` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `prId` VARCHAR(191) NOT NULL,
    `abstactId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `po` (
    `id` VARCHAR(191) NOT NULL,
    `supplier` JSON NOT NULL,
    `po_num` VARCHAR(191) NOT NULL,
    `issue_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delivery_location` VARCHAR(191) NULL,
    `delivery_date` DATETIME(3) NOT NULL,
    `delivery_duration` INTEGER NOT NULL DEFAULT 3,
    `delivery_term` VARCHAR(191) NOT NULL,
    `payment_term` VARCHAR(191) NOT NULL,
    `tracking` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `particulars` JSON NOT NULL,
    `prId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `po_po_num_key`(`po_num`),
    FULLTEXT INDEX `po_po_num_idx`(`po_num`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monitor` (
    `id` VARCHAR(191) NOT NULL,
    `prId` VARCHAR(191) NOT NULL,
    `poId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `urgent` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `description` JSON NOT NULL,
    `particulars` JSON NULL,
    `type` ENUM('ADMIN', 'STD', 'SYSTEM', 'USER') NOT NULL DEFAULT 'STD',
    `level` ENUM('DANGER', 'INFO', 'WARNING', 'SUCCESS') NOT NULL DEFAULT 'INFO',
    `resolved` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `representative` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `tin` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `suppliers_tin_idx`(`tin`),
    FULLTEXT INDEX `suppliers_name_representative_tin_idx`(`name`, `representative`, `tin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `particulars` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sections` ADD CONSTRAINT `sections_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pr` ADD CONSTRAINT `pr_enduserId_fkey` FOREIGN KEY (`enduserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recommendation` ADD CONSTRAINT `recommendation_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `pr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `price_quotations` ADD CONSTRAINT `price_quotations_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `pr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `abstract` ADD CONSTRAINT `abstract_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `pr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `abstract` ADD CONSTRAINT `abstract_rfqId_fkey` FOREIGN KEY (`rfqId`) REFERENCES `price_quotations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `awards` ADD CONSTRAINT `awards_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `pr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `awards` ADD CONSTRAINT `awards_abstactId_fkey` FOREIGN KEY (`abstactId`) REFERENCES `abstract`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `po` ADD CONSTRAINT `po_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `pr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitor` ADD CONSTRAINT `monitor_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `pr`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitor` ADD CONSTRAINT `monitor_poId_fkey` FOREIGN KEY (`poId`) REFERENCES `po`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
