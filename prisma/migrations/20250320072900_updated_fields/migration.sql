/*
  Warnings:

  - You are about to drop the column `remedyId` on the `photos` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `remedies` table. All the data in the column will be lost.
  - Added the required column `ingredientId` to the `photos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `remedies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `photos` DROP FOREIGN KEY `photos_remedyId_fkey`;

-- DropForeignKey
ALTER TABLE `remedies` DROP FOREIGN KEY `remedies_categoryId_fkey`;

-- AlterTable
ALTER TABLE `diseases` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `photos` DROP COLUMN `remedyId`,
    ADD COLUMN `ingredientId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `remedies` DROP COLUMN `categoryId`,
    ADD COLUMN `value` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `photos` ADD CONSTRAINT `photos_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diseases` ADD CONSTRAINT `diseases_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
