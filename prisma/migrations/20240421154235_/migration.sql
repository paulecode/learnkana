-- CreateTable
CREATE TABLE "KanaQuizSession" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KanaQuizSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanaQuizChallenge" (
    "id" SERIAL NOT NULL,
    "kanaQuizSessionId" INTEGER,
    "challenge" TEXT NOT NULL,
    "question" TEXT[],
    "answer" TEXT NOT NULL,
    "givenAnswer" TEXT NOT NULL,

    CONSTRAINT "KanaQuizChallenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KanaQuizSession" ADD CONSTRAINT "KanaQuizSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanaQuizChallenge" ADD CONSTRAINT "KanaQuizChallenge_kanaQuizSessionId_fkey" FOREIGN KEY ("kanaQuizSessionId") REFERENCES "KanaQuizSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
