export const runtime = "nodejs"; // at the top of route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { createToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { name,email, password} = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name ,Email and password required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const saltRounds = process.env.NODE_ENV === "production" ? 10 : 8;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = await createToken({ id: user.id,email: user.email });

    return NextResponse.json(
      { user: { id: user.id, email: user.email }},
      { status: 201 }
    );

   
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
