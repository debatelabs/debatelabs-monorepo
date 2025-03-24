/*
  Warnings:

  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('SETTING', 'RECRUITING', 'READY', 'PLAYING', 'DONE');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "first_name",
DROP COLUMN "language",
DROP COLUMN "last_name",
ADD COLUMN     "name" VARCHAR(256) NOT NULL DEFAULT 'Unknown';

-- AlterTable
ALTER TABLE "user_device" ALTER COLUMN "access_token" DROP NOT NULL,
ALTER COLUMN "refresh_token" DROP NOT NULL;

-- DropEnum
DROP TYPE "Language";

-- CreateTable
CREATE TABLE "room_user" (
    "roomId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "is_judge" BOOLEAN NOT NULL DEFAULT false,
    "teamId" TEXT,

    CONSTRAINT "room_user_pkey" PRIMARY KEY ("roomId","userId")
);

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "topic" VARCHAR(500) NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'SETTING',
    "type" "RoomType" NOT NULL DEFAULT 'PUBLIC',
    "team_count" INTEGER NOT NULL DEFAULT 4,
    "members_count" INTEGER NOT NULL DEFAULT 2,
    "start_at" TIMESTAMP NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator_id" INTEGER NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- AddForeignKey
ALTER TABLE "room_user" ADD CONSTRAINT "room_user_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_user" ADD CONSTRAINT "room_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_user" ADD CONSTRAINT "room_user_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
