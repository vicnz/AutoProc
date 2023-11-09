-- CreateIndex
CREATE FULLTEXT INDEX `users_username_idx` ON `users`(`username`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_email_idx` ON `users`(`email`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_fname_idx` ON `users`(`fname`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_lname_idx` ON `users`(`lname`);
