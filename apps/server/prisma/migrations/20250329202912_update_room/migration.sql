/*
  Warnings:

  - You are about to drop the `Topic` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomId` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "room" ALTER COLUMN "start_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "team" ADD COLUMN     "roomId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Topic";

-- CreateTable
CREATE TABLE "topic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(500) NOT NULL,

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "topic_name_key" ON "topic"("name");

-- AddForeignKey
ALTER TABLE "team" ADD CONSTRAINT "team_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
