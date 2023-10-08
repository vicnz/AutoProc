-- AlterTable
ALTER TABLE `delivery` MODIFY `endDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `purchase_requests` MODIFY `purpose` VARCHAR(255) NOT NULL DEFAULT 'Please Provide a Purpose Here...';
