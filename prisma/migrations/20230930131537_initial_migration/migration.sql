-- CreateTable
CREATE TABLE `departments` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    FULLTEXT INDEX `departments_name_description_idx`(`name`, `description`),
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
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    FULLTEXT INDEX `sections_name_description_idx`(`name`, `description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `userType` ENUM('ADMIN', 'USER', 'TRACKER', 'CHECKER') NOT NULL DEFAULT 'USER',
    `password` VARCHAR(255) NOT NULL,
    `fname` VARCHAR(191) NOT NULL,
    `mname` VARCHAR(191) NULL,
    `lname` VARCHAR(191) NOT NULL,
    `suffix` VARCHAR(10) NULL,
    `profile` MEDIUMBLOB NULL,
    `departmentId` VARCHAR(191) NULL,
    `sectionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    FULLTEXT INDEX `users_username_email_fname_lname_idx`(`username`, `email`, `fname`, `lname`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `officers` (
    `id` VARCHAR(191) NOT NULL,
    `position` ENUM('HEAD', 'CHAIR', 'VICE', 'MEMBER', 'OTHER') NOT NULL DEFAULT 'OTHER',
    `fname` VARCHAR(191) NOT NULL,
    `mname` VARCHAR(191) NULL,
    `lname` VARCHAR(191) NOT NULL,
    `suffix` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL DEFAULT 'No Title',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_requests` (
    `id` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NULL,
    `sai` VARCHAR(191) NULL,
    `obr` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `reference` VARCHAR(191) NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `purpose` VARCHAR(191) NOT NULL DEFAULT 'Please Provide a Purpose Here...',
    `budget` DOUBLE NOT NULL DEFAULT 0.00,
    `type` ENUM('SVP', 'BIDDING', 'REORDER') NOT NULL DEFAULT 'SVP',
    `userId` VARCHAR(191) NULL,
    `particulars` JSON NOT NULL,
    `tracking` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `purchase_requests_number_key`(`number`),
    FULLTEXT INDEX `purchase_requests_number_reference_purpose_idx`(`number`, `reference`, `purpose`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `units` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_recommendations` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(255) NOT NULL DEFAULT '',
    `content` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `tracking` JSON NOT NULL,
    `prId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `purchase_recommendations_prId_key`(`prId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_price_quotations` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `suppliers` JSON NOT NULL,
    `tracking` JSON NOT NULL,
    `ris` VARCHAR(191) NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `prId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `purchase_price_quotations_prId_key`(`prId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_quotation_abstracts` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quotations` JSON NOT NULL,
    `location` VARCHAR(191) NULL,
    `furnishedAt` VARCHAR(191) NULL,
    `tracking` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `lowestBidder` VARCHAR(191) NULL,
    `lowestAmount` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `prId` VARCHAR(191) NOT NULL,
    `rfqId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `purchase_quotation_abstracts_prId_key`(`prId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_awards` (
    `id` VARCHAR(191) NOT NULL,
    `tracking` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NOT NULL DEFAULT '',
    `content` JSON NOT NULL,
    `prId` VARCHAR(191) NOT NULL,
    `abstractId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `purchase_awards_prId_key`(`prId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_orders` (
    `id` VARCHAR(191) NOT NULL,
    `entity` VARCHAR(191) NOT NULL,
    `supplier` JSON NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mode` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NULL,
    `duration` INTEGER NOT NULL,
    `term` VARCHAR(191) NOT NULL,
    `payment` VARCHAR(191) NOT NULL,
    `tracking` JSON NOT NULL,
    `final` BOOLEAN NOT NULL DEFAULT false,
    `released` BOOLEAN NOT NULL DEFAULT false,
    `particulars` JSON NOT NULL,
    `prId` VARCHAR(191) NOT NULL,
    `abstractId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `purchase_orders_number_key`(`number`),
    FULLTEXT INDEX `purchase_orders_number_entity_mode_destination_term_payment_idx`(`number`, `entity`, `mode`, `destination`, `term`, `payment`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery` (
    `id` VARCHAR(191) NOT NULL,
    `poId` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endDate` DATETIME(3) NOT NULL,
    `urgent` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

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
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

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
ALTER TABLE `users` ADD CONSTRAINT `users_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `sections`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_requests` ADD CONSTRAINT `purchase_requests_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_recommendations` ADD CONSTRAINT `purchase_recommendations_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `purchase_requests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_price_quotations` ADD CONSTRAINT `purchase_price_quotations_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `purchase_requests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_quotation_abstracts` ADD CONSTRAINT `purchase_quotation_abstracts_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `purchase_requests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_quotation_abstracts` ADD CONSTRAINT `purchase_quotation_abstracts_rfqId_fkey` FOREIGN KEY (`rfqId`) REFERENCES `purchase_price_quotations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_awards` ADD CONSTRAINT `purchase_awards_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `purchase_requests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_awards` ADD CONSTRAINT `purchase_awards_abstractId_fkey` FOREIGN KEY (`abstractId`) REFERENCES `purchase_quotation_abstracts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_orders` ADD CONSTRAINT `purchase_orders_prId_fkey` FOREIGN KEY (`prId`) REFERENCES `purchase_requests`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchase_orders` ADD CONSTRAINT `purchase_orders_abstractId_fkey` FOREIGN KEY (`abstractId`) REFERENCES `purchase_quotation_abstracts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_poId_fkey` FOREIGN KEY (`poId`) REFERENCES `purchase_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
