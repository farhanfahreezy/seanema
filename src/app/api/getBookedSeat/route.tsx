import { NextRequest, NextResponse } from "next/server";
import prisma from "../../libs/prismadb";

export async function GET(request: NextRequest) {
  const body = await new URL(request.url);
  const title = body.searchParams.get("title");
  const dateWithTime = body.searchParams.get("date");
  const time = body.searchParams.get("time");

  if (!dateWithTime || !time) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  // Removing time from date and adjust with db time
  const date = new Date(dateWithTime.substring(0, 10));
  date.setUTCHours(17);

  const transactionHistory = await prisma.transaction.findMany({
    where: {
      title: title!,
      date,
      time,
    },
    select: {
      tickets: true,
    },
  });

  return NextResponse.json(transactionHistory);
}
