/*
  Warnings:

  - You are about to drop the column `capsuleProposal` on the `startups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "startups" DROP COLUMN "capsuleProposal";

-- CreateTable
CREATE TABLE "capsule_proposals" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "targetMarket" TEXT NOT NULL,
    "solutionDescription" TEXT NOT NULL,
    "objectives" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "methodology" TEXT NOT NULL,
    "startupId" INTEGER NOT NULL,

    CONSTRAINT "capsule_proposals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "capsule_proposals_startupId_key" ON "capsule_proposals"("startupId");

-- AddForeignKey
ALTER TABLE "capsule_proposals" ADD CONSTRAINT "capsule_proposals_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "startups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
