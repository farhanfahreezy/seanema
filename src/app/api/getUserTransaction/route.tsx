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
    throw new Error("Username not found");
  }

  const transactionHistory = await prisma.transaction.findMany({
    where: {
      username: userDb.username,
    },
    select: {
      id: true,
      title: true,
      price: true,
      total: true,
      date: true,
      time: true,
      tickets: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(transactionHistory);
}
