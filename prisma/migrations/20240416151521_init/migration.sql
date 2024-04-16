-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scoreUnlockRequirement" INTEGER NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "english" TEXT NOT NULL,
    "romaji" TEXT NOT NULL,
    "hiragana" TEXT,
    "katakana" TEXT,
    "kanji" TEXT,
    "categoryId" INTEGER,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alphabet" (
    "id" SERIAL NOT NULL,
    "kana" TEXT NOT NULL,
    "scoreUnlockRequirement" INTEGER NOT NULL,

    CONSTRAINT "Alphabet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KanaGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scoreUnlockRequirement" INTEGER NOT NULL,
    "alphabetId" INTEGER,

    CONSTRAINT "KanaGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "romaji" TEXT NOT NULL,
    "kana" TEXT NOT NULL,
    "kanaGroupId" INTEGER,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "kanaGroupId" INTEGER,
    "categoryId" INTEGER,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KanaGroup" ADD CONSTRAINT "KanaGroup_alphabetId_fkey" FOREIGN KEY ("alphabetId") REFERENCES "Alphabet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_kanaGroupId_fkey" FOREIGN KEY ("kanaGroupId") REFERENCES "KanaGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_kanaGroupId_fkey" FOREIGN KEY ("kanaGroupId") REFERENCES "KanaGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
