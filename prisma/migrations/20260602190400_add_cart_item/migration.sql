/*
  Warnings:

  - You are about to drop the column `product_id` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `quatity` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `cart` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "product_cart_productId_product_id_fk";

-- DropIndex
DROP INDEX "cart_id_idx";

-- DropIndex
DROP INDEX "cart_product_id_idx";

-- DropIndex
DROP INDEX "cart_user_id_product_id_size_key";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "product_id",
DROP COLUMN "quatity",
DROP COLUMN "size",
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL;

-- CreateTable
CREATE TABLE "cart_item" (
    "id" TEXT NOT NULL,
    "cart_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "size" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "cart_item_cart_id_idx" ON "cart_item"("cart_id");

-- CreateIndex
CREATE INDEX "cart_item_product_id_idx" ON "cart_item"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_cart_id_product_id_size_key" ON "cart_item"("cart_id", "product_id", "size");

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_cartId_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cart_item" ADD CONSTRAINT "cart_item_productId_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
