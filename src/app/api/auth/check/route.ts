import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("auth_token")?.value;

  // Return authentication status
  return NextResponse.json({
    authenticated: !!token,
  });
}
