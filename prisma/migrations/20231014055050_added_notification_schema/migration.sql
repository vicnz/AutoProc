-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `resolved` BOOLEAN NOT NULL DEFAULT false,
    `level` ENUM('ERROR', 'WARNING', 'INFO') NOT NULL DEFAULT 'INFO',
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(255) NULL,
    `source` VARCHAR(191) NULL,
    `content` JSON NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
