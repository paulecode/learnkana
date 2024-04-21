import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const alphabetParam = Number(searchParams.get("alphabet"));

  const alphabet = await prisma.alphabet.findUnique({
    where: { id: alphabetParam },
    include: { groups: { include: { characters: true } } },
  });

  return NextResponse.json({ success: true, alphabet }, { status: 200 });
}
