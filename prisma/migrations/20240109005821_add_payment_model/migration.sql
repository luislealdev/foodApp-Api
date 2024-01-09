/*
  Warnings:

  - You are about to drop the column `PaymentMethodId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `CoffeShop` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `PaymentMethod` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CoffeShop" DROP CONSTRAINT "CoffeShop_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_PaymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_CoffeShopId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "PaymentMethodId",
ADD COLUMN     "paymentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PaymentMethod" ADD COLUMN     "paymentId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CoffeShop";

-- CreateTable
CREATE TABLE "CoffeeShop" (
    "coffeShopId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "instituteId" TEXT NOT NULL,

    CONSTRAINT "CoffeeShop_pkey" PRIMARY KEY ("coffeShopId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentMethodId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentMethodId_key" ON "Payment"("paymentMethodId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_CoffeShopId_fkey" FOREIGN KEY ("CoffeShopId") REFERENCES "CoffeeShop"("coffeShopId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("paymentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoffeeShop" ADD CONSTRAINT "CoffeeShop_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("instituteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "PaymentMethod"("paymentMethodId") ON DELETE RESTRICT ON UPDATE CASCADE;
