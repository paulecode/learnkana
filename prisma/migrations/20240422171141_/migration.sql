/*
  Warnings:

  - Added the required column `challenge` to the `KanaQuizChallenge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "KanaQuizChallenge" ADD COLUMN     "challenge" TEXT NOT NULL;
