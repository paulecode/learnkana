import prisma from "@/lib/db";
import { Character } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json();

  const { id, group } = request;

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: Number(id) },
  });

  console.log(`Route create QuizSession hit, group parameter ${group}`);

  if (!user) {
    throw new Error("User not found");
  }

  const existingSession = await prisma.kanaQuizSession.findFirst({
    where: { userId: user.id },
  });

  // Deactivate as soon as we want to track statistics
  if (existingSession) {
    await prisma.kanaQuizSession.deleteMany({ where: { userId: user.id } });
  }

  const letterGroup = await prisma.kanaGroup.findFirst({
    where: { id: Number(group) },
    include: { characters: true },
  });

  if (!letterGroup) {
    console.log("Couldn't find lettergroup");
    throw new Error("letter group doesn't exist");
  }

  console.log("Found lettergroup");

  const generateQuestionSet = async (letterGroup: Character[]) => {
    const quizSession = await prisma.kanaQuizSession.create({
      data: { userId: user.id },
    });

    const group = [...letterGroup];
    for (const character in group) {
      await generateQuestion(group[character], group, true, quizSession.id);
      await generateQuestion(group[character], group, true, quizSession.id);
      await generateQuestion(group[character], group, false, quizSession.id);
      await generateQuestion(group[character], group, false, quizSession.id);
    }
  };

  const generateQuestion = async (
    answerChar: Character,
    letterGroup: Character[],
    romajiToKana: boolean,
    quizSessionId: number,
  ) => {
    const group = [...letterGroup];
    const questionPool: string[] = [];

    console.log(`Question generator for ${answerChar.kana}`);
    group.splice(group.indexOf(answerChar), 1);

    const options = [...group];

    while (options.length > 0) {
      const randomItem = options.splice(
        Math.floor(Math.random() * options.length),
        1,
      )[0];

      questionPool.push(romajiToKana ? randomItem.romaji : randomItem.kana);
    }

    questionPool.length = Math.ceil(letterGroup.length / 2);

    let { kana: answer, romaji: challenge } = answerChar;

    if (romajiToKana) {
      [answer, challenge] = [challenge, answer];
    }

    questionPool.splice(
      Math.floor(Math.random() * (questionPool.length + 1)),
      0,
      answer,
    );
    console.log(`For ${answerChar} generate question set ${[...questionPool]}`);

    await prisma.kanaQuizChallenge.create({
      data: {
        answer,
        challenge,
        options: questionPool,
        KanaQuizSession: { connect: { id: quizSessionId } },
      },
    });
  };

  await generateQuestionSet(letterGroup.characters);

  return NextResponse.json({ success: true }, { status: 200 });
}
