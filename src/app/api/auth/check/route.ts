import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if(!token)
  {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try{
    const payload = await verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.id as string },
      select: { id: true, name: true, email: true }
    });
    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({ authenticated: true, user });
   }
   catch(err)
   {
      return NextResponse.json({
    authenticated: false,
  },{ status: 401 });
   }
}
