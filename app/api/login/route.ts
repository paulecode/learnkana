import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "@/lib/db";
import { cookies } from "next/headers";

const RequestSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Something went wrong" })
    .max(10, { message: "Something went wrong" }),
  password: z
    .string()
    .min(4, { message: "Something went wrong" })
    .max(10, { message: "Something went wrong" }),
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

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );
  }
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch)
    return NextResponse.json(
      { success: false, message: "Invalid password" },
      { status: 401 },
    );

  const secret = process.env.JWT_SECRET || "";
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "15h" });

  return NextResponse.json({ success: true, token }, { status: 200 });
}
