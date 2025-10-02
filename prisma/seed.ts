import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Fetch products from Fake Store API
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products from Fake Store API");
  const apiProducts: any[] = await res.json();

  // 2️⃣ Extract unique categories
  const categoryNames = Array.from(new Set(apiProducts.map((p) => p.category)));

  // 3️⃣ Upsert categories
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // 4️⃣ Fetch categories from DB
  const allCategories = await prisma.category.findMany();

  // 5️⃣ Generate 500+ products by duplicating and randomizing
  const products: any[] = [];
  while (products.length < 500) {
    const original = faker.helpers.arrayElement(apiProducts);
    const category = allCategories.find((c:any) => c.name === original.category);
    const PriceAdd:number=faker.number.float({ min: 0, max: 500 });

    products.push({
      name: `${original.title} ${faker.commerce.productAdjective()}`,
      description: original.description,
      price: parseFloat(original.price) + PriceAdd,
      image: original.image,
      categoryId: category?.id || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // 6️⃣ Insert into DB
  await prisma.product.createMany({ data: products });

  console.log(`✅ Seeded ${products.length} products with Fake Store API + Faker!`);
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
