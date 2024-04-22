/*
  Warnings:

  - You are about to drop the column `challenge` on the `KanaQuizChallenge` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `KanaQuizChallenge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KanaQuizChallenge" DROP COLUMN "challenge",
DROP COLUMN "question",
ADD COLUMN     "options" TEXT[];
