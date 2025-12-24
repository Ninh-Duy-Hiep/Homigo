-- CreateTable
CREATE TABLE `otps` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `otps_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `otps` ADD CONSTRAINT `otps_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
