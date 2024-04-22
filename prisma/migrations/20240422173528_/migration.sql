-- DropForeignKey
ALTER TABLE "KanaQuizChallenge" DROP CONSTRAINT "KanaQuizChallenge_kanaQuizSessionId_fkey";

-- AddForeignKey
ALTER TABLE "KanaQuizChallenge" ADD CONSTRAINT "KanaQuizChallenge_kanaQuizSessionId_fkey" FOREIGN KEY ("kanaQuizSessionId") REFERENCES "KanaQuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
