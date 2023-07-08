import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function GET(request: NextRequest) {
  const body = await new URL(request.url);
  const username = body.searchParams.get("username");
  const userDb = await prisma.user.findUnique({
    select: { name: true, username: true, birthday: true, balance: true },
    where: {
      username: username!,
    },
  });
  if (!userDb) {
    return NextResponse.json(
      { message: "Username not found" },
      { status: 400 }
    );
  }

  return NextResponse.json(userDb);
}
