import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const body = await request.json();
  const { id, username } = body;

  if (!id || !username) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const deletedTransaction = await prisma.transaction.delete({
    where: {
      id,
    },
  });
  const decrementBalance = await prisma.user.update({
    where: {
      username: username,
    },
    data: { balance: { increment: deletedTransaction.total } },
  });

  return NextResponse.json({ message: "Refund successfull" }, { status: 200 });
}
