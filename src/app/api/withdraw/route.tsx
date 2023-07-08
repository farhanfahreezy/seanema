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
    return NextResponse.json(
      { message: "Username not found" },
      { status: 400 }
    );
  }

  if (userDb.balance < parseInt(newBalance)) {
    return NextResponse.json(
      { message: "Your balance is not enough" },
      { status: 400 }
    );
  }

  const decrement = await prisma.user.update({
    where: {
      username: username!,
    },
    data: { balance: { decrement: parseInt(newBalance) } },
  });

  return NextResponse.json(
    { message: "Withdraw successfull" },
    { status: 200 }
  );
}
