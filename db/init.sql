DROP TABLE IF EXISTS `feedback`;
DROP TABLE IF EXISTS `room_status_history`;
DROP TABLE IF EXISTS `special_requests`;
DROP TABLE IF EXISTS `waitlist`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `reservation_services`;
DROP TABLE IF EXISTS `reservations`;
DROP TABLE IF EXISTS `services`;
DROP TABLE IF EXISTS `rooms`;
DROP TABLE IF EXISTS `room_types`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `roles`;

-- Create database
CREATE DATABASE IF NOT EXISTS `hotel_trivago` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `hotel_trivago`;

-- Roles (e.g., Guest, Receptionist, Admin)
CREATE TABLE `roles` (
  `role_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `role_name` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- Users (guests and staff)
CREATE TABLE `users` (
  `user_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(50) NULL,
  `address` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`role_id`) REFERENCES `roles`(`role_id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Room types
CREATE TABLE `room_types` (
  `type_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `type_name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `capacity` INT NOT NULL DEFAULT 1,
  `base_price` DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

-- Rooms
CREATE TABLE `rooms` (
  `room_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `room_number` VARCHAR(20) NOT NULL UNIQUE,
  `type_id` INT UNSIGNED NOT NULL,
  `current_status` ENUM('available','occupied','cleaning','maintenance') NOT NULL DEFAULT 'available',
  `description` TEXT NULL,
  FOREIGN KEY (`type_id`) REFERENCES `room_types`(`type_id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Additional services (massage, dinner, tours, etc.)
CREATE TABLE `services` (
  `service_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `service_name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `price` DECIMAL(10,2) NOT NULL
) ENGINE=InnoDB;

-- Reservations
CREATE TABLE `reservations` (
  `reservation_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `guest_id` INT UNSIGNED NOT NULL,
  `room_id` INT UNSIGNED NOT NULL,
  `check_in_date` DATE NOT NULL,
  `check_out_date` DATE NOT NULL,
  `status` ENUM('pending','confirmed','checked_in','checked_out','cancelled') NOT NULL DEFAULT 'pending',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`guest_id`) REFERENCES `users`(`user_id`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Junction: reservation to services
CREATE TABLE `reservation_services` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reservation_id` INT UNSIGNED NOT NULL,
  `service_id` INT UNSIGNED NOT NULL,
  `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
  FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`reservation_id`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`service_id`) REFERENCES `services`(`service_id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Payments and billing
CREATE TABLE `payments` (
  `payment_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reservation_id` INT UNSIGNED NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL,
  `status` ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
  `paid_at` DATETIME NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`reservation_id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Waitlist when no rooms are available
CREATE TABLE `waitlist` (
  `waitlist_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `guest_id` INT UNSIGNED NOT NULL,
  `requested_check_in` DATE NOT NULL,
  `requested_check_out` DATE NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `notified` TINYINT(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (`guest_id`) REFERENCES `users`(`user_id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Special requests
CREATE TABLE `special_requests` (
  `request_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reservation_id` INT UNSIGNED NOT NULL,
  `guest_id` INT UNSIGNED NOT NULL,
  `request_text` TEXT NOT NULL,
  `status` ENUM('pending','fulfilled','denied') NOT NULL DEFAULT 'pending',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`reservation_id`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`guest_id`) REFERENCES `users`(`user_id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Room status history (updates by staff)
CREATE TABLE `room_status_history` (
  `history_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `room_id` INT UNSIGNED NOT NULL,
  `old_status` ENUM('available','occupied','cleaning','maintenance') NOT NULL,
  `new_status` ENUM('available','occupied','cleaning','maintenance') NOT NULL,
  `changed_by` INT UNSIGNED NOT NULL,
  `changed_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`room_id`) REFERENCES `rooms`(`room_id`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`changed_by`) REFERENCES `users`(`user_id`)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- Guest evaluations / feedback
CREATE TABLE `feedback` (
  `feedback_id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reservation_id` INT UNSIGNED NOT NULL,
  `guest_id` INT UNSIGNED NOT NULL,
  `rating` TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
  `comments` TEXT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`reservation_id`) REFERENCES `reservations`(`reservation_id`)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (`guest_id`) REFERENCES `users`(`user_id`)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Provide default roles and some room statuses
INSERT INTO `roles` (`role_name`) VALUES ('Guest'), ('Receptionist'), ('Admin') ON DUPLICATE KEY UPDATE role_name = VALUES(role_name);
