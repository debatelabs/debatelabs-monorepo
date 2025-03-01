/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `friendship` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user_device` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_device` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `user_device` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'UK');

-- AlterTable
ALTER TABLE "friendship" DROP COLUMN "updatedAt",
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN',
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "user_device" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) NOT NULL;

-- CreateTable
CREATE TABLE "log_error" (
    "id" SERIAL NOT NULL,
    "status" DOUBLE PRECISION,
    "title" VARCHAR(256),
    "message" TEXT NOT NULL,
    "stack_trace" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_error_pkey" PRIMARY KEY ("id")
);
