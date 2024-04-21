import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import prisma from "@/lib/db";

const RequestSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be 4 characters long minimum" })
    .max(10, { message: "Username cannot be longer than 10 characters" }),
  password: z
    .string()
    .min(4, { message: "Password must be 4 characters long minimum" })
    .max(10, { message: "Password cannot be longer than 10 characters" }),
});

export async function POST(req: NextRequest) {
  const request = await req.json();
  const result = RequestSchema.safeParse(request);
  if (!result.success) {
    return NextResponse.json(
      { success: false, message: result.error.format() },
      { status: 400 },
    );
  }

  let { username, password } = result.data;

  username = username.toLowerCase();

  const user = await prisma.user.findUnique({ where: { username } });

  console.log(user);

  if (user) {
    return NextResponse.json(
      { success: false, message: "User exists already" },
      { status: 409 },
    );
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  try {
    await prisma.user.create({ data: { username, password } });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: (e as Error).message },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
