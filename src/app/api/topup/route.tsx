import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { username, newBalance } = body;
  console.log(username, newBalance);
  const userDb = await prisma.user.update({
    where: {
      username: username!,
    },
    data: { balance: { increment: parseInt(newBalance!) } },
  });

  return NextResponse.json(userDb);
}
