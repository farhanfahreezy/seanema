import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const body = await request.json();
  const { name, username, birthday, password } = body;

  if (!name || !username || !birthday || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const isExist = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (isExist) {
    return NextResponse.json(
      { message: "Username already exist" },
      { status: 400 }
    );
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      username,
      hashedPassword: hashedPass,
      birthday: birthday,
      balance: 0,
    },
  });

  return NextResponse.json(user);
}
