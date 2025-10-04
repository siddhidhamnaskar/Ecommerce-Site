export const runtime = "nodejs"; // at the top of route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req:Request){
   try{
     const {searchParams}=new URL(req.url);

     const category=searchParams.get('category');
     const minPrice=searchParams.get('minPrice');
     const maxPrice=searchParams.get('maxPrice');
     const sortBy=searchParams.get('sortBy') || 'createdAt';
     const order=searchParams.get('order') || 'desc';

     const products=await prisma.product.findMany({
       where:{
        ...(category ? { category: { name: { equals: category, mode: "insensitive" } } } : {}),
        ...(minPrice ? { price: { gte: parseFloat(minPrice) } } : {}),
        ...(maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {}),
       },
       orderBy:{
          [sortBy]:order
       },
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
