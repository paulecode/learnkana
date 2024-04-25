import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const userId = Number(searchParams.get("id"));

  const quizSession = await prisma.kanaQuizSession.findFirstOrThrow({
    where: { userId },
    orderBy: { date: "desc" },
  });

  const unansweredCount = await prisma.kanaQuizChallenge.count({
    where: { givenAnswer: null, kanaQuizSessionId: quizSession.id },
  });

  const totalCount = await prisma.kanaQuizChallenge.count({
    where: { kanaQuizSessionId: quizSession.id },
  });

  if (unansweredCount == 0) {
    return NextResponse.json(
      { success: true, unansweredCount, totalCount },
      { status: 200 },
    );
  }

  const randomQuestion = await prisma.kanaQuizChallenge.findFirst({
    where: { givenAnswer: null, kanaQuizSessionId: quizSession.id },
    skip: Math.floor(Math.random() * unansweredCount),
    select: { challenge: true, options: true, id: true },
  });

  return NextResponse.json(
    { success: true, totalCount, unansweredCount, randomQuestion },
    { status: 200 },
  );
}
