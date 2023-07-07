import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const body = await request.json();
  const { username, title, price, total, date, time, tickets } = body;

  if (!username || !title || !price || !total || !date || !time || !tickets) {
    throw new NextResponse("Missing Fields", { status: 400 });
  }

  const userDb = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!userDb) {
    throw new Error("No username found");
  }

  const trans = await prisma.transaction.create({
    data: {
      username,
      title,
      price,
      total,
      date,
      time,
      tickets,
    },
  });

  const decrementBalance = await prisma.user.update({
    where: {
      username: username,
    },
    data: { balance: { decrement: trans.total } },
  });

  return NextResponse.json(trans);
}
