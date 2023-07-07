import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { username, newBalance } = body;
  console.log(username, newBalance);

  const userDb = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!userDb) {
    throw new Error("No username found");
  }

  if (userDb.balance < parseInt(newBalance)) {
    throw new Error("Your balance is not enough");
  }

  const decrement = await prisma.user.update({
    where: {
      username: username!,
    },
    data: { balance: { decrement: parseInt(newBalance) } },
  });

  return NextResponse.json(decrement);
}
