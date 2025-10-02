import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Fetch products from Fake Store API
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products from Fake Store API");
  const apiProducts: any[] = await res.json();

  // 2️⃣ Extract unique categories from API
  const categoryNames = Array.from(new Set(apiProducts.map((p) => p.category)));

  // 3️⃣ Upsert categories in Prisma
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 4️⃣ Fetch inserted categories
  const allCategories = await prisma.category.findMany();

  // 5️⃣ Map API products to Prisma format
  const products = apiProducts.map((p) => {
    const category = allCategories.find((c:any) => c.name === p.category);

    return {
      name: p.title,
      description: p.description,
      price: parseFloat(p.price),
      image: p.image,
      categoryId: category?.id || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  // 6️⃣ Insert products
  await prisma.product.createMany({ data: products });

  console.log(`✅ Seeded ${products.length} products from Fake Store API!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
