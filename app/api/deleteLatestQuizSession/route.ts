import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const userId = Number(searchParams.get("id"));

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  const latestSession = await prisma.kanaQuizSession.findFirstOrThrow({
    where: { userId },
    orderBy: { date: "desc" },
  });

  await prisma.kanaQuizSession.delete({ where: { id: latestSession.id } });

  return NextResponse.json({ success: true }, { status: 200 });
}
