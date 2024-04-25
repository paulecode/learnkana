import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const userId = Number(searchParams.get("id"));

  const quizSession = await prisma.kanaQuizSession.findFirstOrThrow({
    where: { userId },
    orderBy: { date: "desc" },
  });

  const answers = await prisma.kanaQuizChallenge.findMany({
    where: { kanaQuizSessionId: quizSession.id },
    select: { challenge: true, answer: true, givenAnswer: true },
  });

  return NextResponse.json({ success: true, answers }, { status: 200 });
}
