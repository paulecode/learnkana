import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const userId = Number(searchParams.get("id"));

  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { username: true, id: true },
  });

  return NextResponse.json({ success: true, user }, { status: 200 });
}
