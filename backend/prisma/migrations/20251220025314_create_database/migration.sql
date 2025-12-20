-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(500) NULL,
    `bio` TEXT NULL,
    `role` ENUM('USER', 'HOST', 'ADMIN') NOT NULL DEFAULT 'USER',
    `provider` ENUM('LOCAL', 'GOOGLE') NOT NULL DEFAULT 'GOOGLE',
    `google_id` VARCHAR(191) NULL,
    `host_status` ENUM('NEW', 'PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'NEW',
    `phone_number` VARCHAR(20) NULL,
    `identity_card_url` VARCHAR(500) NULL,
    `identity_card_cloudinary_id` VARCHAR(191) NULL,
    `rejection_reason` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `email_verified` BOOLEAN NOT NULL DEFAULT false,
    `last_login_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_google_id_key`(`google_id`),
    INDEX `users_host_status_idx`(`host_status`),
    INDEX `users_role_created_at_idx`(`role`, `created_at`),
    INDEX `users_role_is_active_idx`(`role`, `is_active`),
    INDEX `users_full_name_idx`(`full_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `host_update_requests` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `changes` JSON NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `admin_note` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `host_update_requests_user_id_idx`(`user_id`),
    INDEX `host_update_requests_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` VARCHAR(191) NOT NULL,
    `host_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `property_type` ENUM('APARTMENT', 'HOUSE', 'VILLA', 'HOTEL', 'STUDIO') NOT NULL DEFAULT 'APARTMENT',
    `price_per_night` DECIMAL(10, 2) NOT NULL,
    `cleaning_fee` DECIMAL(10, 2) NULL DEFAULT 0,
    `service_fee_percentage` DECIMAL(5, 2) NULL DEFAULT 10.00,
    `max_guests` INTEGER NOT NULL DEFAULT 1,
    `bedrooms` INTEGER NOT NULL DEFAULT 1,
    `beds` INTEGER NOT NULL DEFAULT 1,
    `bathrooms` INTEGER NOT NULL DEFAULT 1,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NULL,
    `country` VARCHAR(100) NOT NULL,
    `postal_code` VARCHAR(20) NULL,
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(11, 8) NULL,
    `images` JSON NOT NULL,
    `image_cloudinary_ids` JSON NULL,
    `instant_booking` BOOLEAN NOT NULL DEFAULT false,
    `minimum_nights` INTEGER NOT NULL DEFAULT 1,
    `maximum_nights` INTEGER NOT NULL DEFAULT 365,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `rooms_host_id_idx`(`host_id`),
    INDEX `rooms_city_idx`(`city`),
    INDEX `rooms_price_per_night_idx`(`price_per_night`),
    INDEX `rooms_is_published_is_active_idx`(`is_published`, `is_active`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amenities` (
    `id` VARCHAR(191) NOT NULL,
    `name_key` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(50) NULL,
    `category` ENUM('BASIC', 'FACILITY', 'SAFETY') NOT NULL DEFAULT 'BASIC',

    UNIQUE INDEX `amenities_name_key_key`(`name_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_amenities` (
    `room_id` VARCHAR(191) NOT NULL,
    `amenity_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`room_id`, `amenity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `guest_id` VARCHAR(191) NOT NULL,
    `check_in_date` DATE NOT NULL,
    `check_out_date` DATE NOT NULL,
    `number_of_guests` INTEGER NOT NULL,
    `number_of_nights` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `cleaning_fee` DECIMAL(10, 2) NULL DEFAULT 0,
    `service_fee` DECIMAL(10, 2) NOT NULL,
    `total_price` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    `payment_status` ENUM('UNPAID', 'PAID', 'REFUNDED') NOT NULL DEFAULT 'UNPAID',
    `stripe_payment_intent_id` VARCHAR(191) NULL,
    `special_requests` TEXT NULL,
    `cancellation_reason` TEXT NULL,
    `cancelled_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `bookings_stripe_payment_intent_id_key`(`stripe_payment_intent_id`),
    INDEX `bookings_guest_id_idx`(`guest_id`),
    INDEX `bookings_room_id_check_in_date_check_out_date_idx`(`room_id`, `check_in_date`, `check_out_date`),
    INDEX `bookings_status_payment_status_idx`(`status`, `payment_status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` VARCHAR(191) NOT NULL,
    `booking_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `reviewer_id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `cleanliness_rating` INTEGER NULL,
    `accuracy_rating` INTEGER NULL,
    `communication_rating` INTEGER NULL,
    `location_rating` INTEGER NULL,
    `value_rating` INTEGER NULL,
    `comment` TEXT NULL,
    `host_response` TEXT NULL,
    `host_responded_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `reviews_booking_id_key`(`booking_id`),
    INDEX `reviews_room_id_idx`(`room_id`),
    INDEX `reviews_rating_idx`(`rating`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wishlists` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `wishlists_user_id_idx`(`user_id`),
    UNIQUE INDEX `wishlists_user_id_room_id_key`(`user_id`, `room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` ENUM('BOOKING', 'REVIEW', 'HOST_APPROVAL', 'PAYMENT', 'SYSTEM') NOT NULL,
    `title_key` VARCHAR(191) NOT NULL,
    `message_key` VARCHAR(191) NOT NULL,
    `message_params` JSON NULL,
    `link` VARCHAR(500) NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notifications_user_id_is_read_idx`(`user_id`, `is_read`),
    INDEX `notifications_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `translations` (
    `id` VARCHAR(191) NOT NULL,
    `entity_type` ENUM('ROOM', 'USER_BIO') NOT NULL,
    `entity_id` VARCHAR(191) NOT NULL,
    `field_name` VARCHAR(50) NOT NULL,
    `language_code` VARCHAR(5) NOT NULL,
    `translated_text` TEXT NOT NULL,
    `is_auto_generated` BOOLEAN NULL DEFAULT true,
    `provider` VARCHAR(50) NULL DEFAULT 'GOOGLE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `translations_entity_type_entity_id_language_code_idx`(`entity_type`, `entity_id`, `language_code`),
    UNIQUE INDEX `translations_entity_type_entity_id_field_name_language_code_key`(`entity_type`, `entity_id`, `field_name`, `language_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `host_update_requests` ADD CONSTRAINT `host_update_requests_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_host_id_fkey` FOREIGN KEY (`host_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_amenities` ADD CONSTRAINT `room_amenities_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_amenities` ADD CONSTRAINT `room_amenities_amenity_id_fkey` FOREIGN KEY (`amenity_id`) REFERENCES `amenities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_guest_id_fkey` FOREIGN KEY (`guest_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_reviewer_id_fkey` FOREIGN KEY (`reviewer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wishlists` ADD CONSTRAINT `wishlists_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
