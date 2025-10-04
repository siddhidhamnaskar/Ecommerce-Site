import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("auth_token")?.value;

  if(!token)
  {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try{
    
     await verifyToken(token);
    return NextResponse.json({ authenticated: true });
   }
   catch(err)
   {
      return NextResponse.json({
    authenticated: !!false,
  },{ status: 401 });
   }
}
