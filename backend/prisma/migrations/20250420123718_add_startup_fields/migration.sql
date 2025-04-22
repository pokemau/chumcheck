-- AlterTable
ALTER TABLE "startups" ADD COLUMN     "capsuleProposal" TEXT,
ADD COLUMN     "dataPrivacy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "eligibility" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "groupName" VARCHAR(100),
ADD COLUMN     "links" TEXT,
ADD COLUMN     "qualificationStatus" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "universityName" VARCHAR(100);
