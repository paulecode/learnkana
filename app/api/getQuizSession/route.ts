import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const userId = Number(searchParams.get("id"));
}
