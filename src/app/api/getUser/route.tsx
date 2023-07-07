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

  return NextResponse.json(userDb);
}
