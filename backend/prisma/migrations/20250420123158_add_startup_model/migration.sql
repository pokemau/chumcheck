-- CreateTable
CREATE TABLE "startups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "startups_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "startups" ADD CONSTRAINT "startups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
