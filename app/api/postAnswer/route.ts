import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const { answerId, answer } = await req.json();

  if (!answerId || !answer) {
    throw new Error("Missing answer or Id");
  }

  // const challenge = await prisma.kanaQuizChallenge.findFirstOrThrow({
  //   where: { kanaQuizSessionId: answerId },
  // });

  const challengeWithAnswer = await prisma.kanaQuizChallenge.update({
    where: { id: Number(answerId) },
    data: { givenAnswer: answer },
  });

  let isCorrect = false;

  if (challengeWithAnswer.answer == challengeWithAnswer.givenAnswer) {
    isCorrect = true;
  }

  return NextResponse.json(
    { success: true, isCorrect, correctAnswer: challengeWithAnswer.answer },
    { status: 200 },
  );
}
