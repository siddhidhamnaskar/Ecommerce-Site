import { SignJWT, jwtVerify ,type JWTPayload} from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key");

interface MyJWTPayload extends JWTPayload {
  id:string,
  email: string;
}

// ✅ Create token (during login)
export async function createToken(payload: MyJWTPayload) {
 
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
}

// ✅ Verify token (middleware or protected route)
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}
