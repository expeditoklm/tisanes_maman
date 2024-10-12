/*
  Warnings:

  - You are about to drop the `disease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instruction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `remedy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `remedy_disease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `remedy_ingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `instruction` DROP FOREIGN KEY `instruction_remedyId_fkey`;

-- DropForeignKey
ALTER TABLE `remedy_disease` DROP FOREIGN KEY `remedy_disease_diseaseId_fkey`;

-- DropForeignKey
ALTER TABLE `remedy_disease` DROP FOREIGN KEY `remedy_disease_remedyId_fkey`;

-- DropForeignKey
ALTER TABLE `remedy_ingredient` DROP FOREIGN KEY `remedy_ingredient_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `remedy_ingredient` DROP FOREIGN KEY `remedy_ingredient_remedyId_fkey`;

-- DropTable
DROP TABLE `disease`;

-- DropTable
DROP TABLE `ingredient`;

-- DropTable
DROP TABLE `instruction`;

-- DropTable
DROP TABLE `remedy`;

-- DropTable
DROP TABLE `remedy_disease`;

-- DropTable
DROP TABLE `remedy_ingredient`;

-- CreateTable
CREATE TABLE `remedies` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instructions` (
    `id` VARCHAR(191) NOT NULL,
    `stepNumber` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `remedyId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingredients` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diseases` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `remedy_ingredients` (
    `remedyId` VARCHAR(191) NOT NULL,
    `ingredientId` VARCHAR(191) NOT NULL,
    `quantity` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`remedyId`, `ingredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `remedy_diseases` (
    `remedyId` VARCHAR(191) NOT NULL,
    `diseaseId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`remedyId`, `diseaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `instructions` ADD CONSTRAINT `instructions_remedyId_fkey` FOREIGN KEY (`remedyId`) REFERENCES `remedies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `remedy_ingredients` ADD CONSTRAINT `remedy_ingredients_remedyId_fkey` FOREIGN KEY (`remedyId`) REFERENCES `remedies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `remedy_ingredients` ADD CONSTRAINT `remedy_ingredients_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `remedy_diseases` ADD CONSTRAINT `remedy_diseases_remedyId_fkey` FOREIGN KEY (`remedyId`) REFERENCES `remedies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `remedy_diseases` ADD CONSTRAINT `remedy_diseases_diseaseId_fkey` FOREIGN KEY (`diseaseId`) REFERENCES `diseases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
