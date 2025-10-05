export const runtime = "nodejs";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    // console.log(searchParams);
    const categoryParam = searchParams.get("category");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const sortByParam = searchParams.get("sortBy") || "createdAt";
    const orderParam = (searchParams.get("order") || "desc").toLowerCase();

    // Convert to numbers safely
    const minPrice =
      minPriceParam !== null && minPriceParam !== ""
        ? Number(minPriceParam)
        : undefined;
    const maxPrice =
      maxPriceParam !== null && maxPriceParam !== ""
        ? Number(maxPriceParam)
        : undefined;

    if ((minPrice !== undefined && isNaN(minPrice)) ||
        (maxPrice !== undefined && isNaN(maxPrice))) {
      return NextResponse.json(
        { error: "Invalid minPrice or maxPrice value" },
        { status: 400 }
      );
    }

    const order: "asc" | "desc" = orderParam === "asc" ? "asc" : "desc";

    // Fetch products between minPrice and maxPrice
    const products = await prisma.product.findMany({
      where: {
        ...(categoryParam
          ? { category: { name: { equals: categoryParam, mode: "insensitive" } } }
          : {}),
        // Price filter between minPrice and maxPrice
        ...(minPrice !== undefined || maxPrice !== undefined
          ? {
              price: {
                ...(minPrice !== undefined ? { gte: minPrice } : {}),
                ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
              },
            }
          : {}),
      },
      orderBy: {
        [sortByParam]: order,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    // console.error(err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
