-- DropIndex
DROP INDEX `users_email_idx` ON `users`;

-- DropIndex
DROP INDEX `users_google_id_idx` ON `users`;

-- CreateIndex
CREATE INDEX `users_role_created_at_idx` ON `users`(`role`, `created_at`);

-- CreateIndex
CREATE INDEX `users_role_is_active_idx` ON `users`(`role`, `is_active`);

-- CreateIndex
CREATE INDEX `users_full_name_idx` ON `users`(`full_name`);
