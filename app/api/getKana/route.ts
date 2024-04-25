import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const alphabetParam = searchParams.get("alphabet") || "";

  const alphabet = await prisma.alphabet.findFirst({
    where: { kana: alphabetParam },
    include: { groups: { include: { characters: true } } },
  });

  return NextResponse.json({ success: true, alphabet }, { status: 200 });
}
