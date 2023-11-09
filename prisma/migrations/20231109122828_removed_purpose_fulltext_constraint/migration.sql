-- DropIndex
DROP INDEX `purchase_requests_number_reference_purpose_idx` ON `purchase_requests`;

-- CreateIndex
CREATE FULLTEXT INDEX `purchase_requests_number_reference_idx` ON `purchase_requests`(`number`, `reference`);
