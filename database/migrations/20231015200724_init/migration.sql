-- CreateTable
CREATE TABLE "Rank" (
    "id" SERIAL NOT NULL,
    "author" TEXT,
    "attempts" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "points" TEXT NOT NULL,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);
