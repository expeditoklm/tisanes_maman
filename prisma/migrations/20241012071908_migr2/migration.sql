/*
  Warnings:

  - You are about to drop the `remedydisease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `remedyingredient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `instruction` DROP FOREIGN KEY `Instruction_remedyId_fkey`;

-- DropForeignKey
ALTER TABLE `remedydisease` DROP FOREIGN KEY `RemedyDisease_diseaseId_fkey`;

-- DropForeignKey
ALTER TABLE `remedydisease` DROP FOREIGN KEY `RemedyDisease_remedyId_fkey`;

-- DropForeignKey
ALTER TABLE `remedyingredient` DROP FOREIGN KEY `RemedyIngredient_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `remedyingredient` DROP FOREIGN KEY `RemedyIngredient_remedyId_fkey`;

-- DropTable
DROP TABLE `remedydisease`;

-- DropTable
DROP TABLE `remedyingredient`;

-- CreateTable
CREATE TABLE `remedy_ingredient` (
    `remedyId` VARCHAR(191) NOT NULL,
    `ingredientId` VARCHAR(191) NOT NULL,
    `quantity` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`remedyId`, `ingredientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `remedy_disease` (
    `remedyId` VARCHAR(191) NOT NULL,
    `diseaseId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`remedyId`, `diseaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `instruction` ADD CONSTRAINT `instruction_remedyId_fkey` FOREIGN KEY (`remedyId`) REFERENCES `remedy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `remedy_ingredient` ADD CONSTRAINT `remedy_ingredient_remedyId_fkey` FOREIGN KEY (`remedyId`) REFERENCES `remedy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `remedy_ingredient` ADD CONSTRAINT `remedy_ingredient_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `remedy_disease` ADD CONSTRAINT `remedy_disease_remedyId_fkey` FOREIGN KEY (`remedyId`) REFERENCES `remedy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `remedy_disease` ADD CONSTRAINT `remedy_disease_diseaseId_fkey` FOREIGN KEY (`diseaseId`) REFERENCES `disease`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
