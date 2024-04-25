import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const userId = Number(searchParams.get("id"));

  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  await prisma.user.delete({ where: { id: user.id } });

  return NextResponse.json({ success: true }, { status: 200 });
}
