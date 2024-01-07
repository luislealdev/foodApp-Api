/*
  Warnings:

  - You are about to drop the column `address` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `UserInfo` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "address",
DROP COLUMN "lastname",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "fullName" TEXT NOT NULL;
