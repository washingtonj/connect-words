/*
  Warnings:

  - The primary key for the `Rank` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `author` on table `Rank` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `attempts` on the `Rank` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `points` on the `Rank` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Rank" DROP CONSTRAINT "Rank_pkey",
ADD COLUMN     "combinations" TEXT[],
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "author" SET NOT NULL,
DROP COLUMN "attempts",
ADD COLUMN     "attempts" INTEGER NOT NULL,
DROP COLUMN "points",
ADD COLUMN     "points" INTEGER NOT NULL,
ADD CONSTRAINT "Rank_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Rank_id_seq";
