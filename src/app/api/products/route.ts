export const runtime = "nodejs"; // at the top of route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req:Request){
   try{
     const products=await prisma.product.findMany({
       include:{
         category:true
       }
     })

    return NextResponse.json({ products }, { status: 200 });


   }
   catch(err)
   {
     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

   }
}
