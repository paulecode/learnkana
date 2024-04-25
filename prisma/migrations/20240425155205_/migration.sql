-- DropForeignKey
ALTER TABLE "KanaQuizSession" DROP CONSTRAINT "KanaQuizSession_userId_fkey";

-- AddForeignKey
ALTER TABLE "KanaQuizSession" ADD CONSTRAINT "KanaQuizSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
