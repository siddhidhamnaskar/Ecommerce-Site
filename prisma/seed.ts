import { PrismaClient } from '@prisma/client'
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const categoryNames = ["Electronics", "Clothing", "Home & Kitchen", "Sports", "Books"];
  
  for (const name of categoryNames) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  const allCategories = await prisma.category.findMany();

  const products = Array.from({ length: 500 }).map(() => {
    const randomCategory = faker.helpers.arrayElement<typeof allCategories[number]>(allCategories);
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
        image: faker.image.urlPicsumPhotos({ width: 300, height: 200 }),
        categoryId: randomCategory.id,
    };
  });


  const productCount = await prisma.product.count();
  if (productCount === 0) {
    await prisma.product.createMany({ data: products });
    console.log("✅ 5 Categories & 500 Products inserted!");
  } else {
    console.log("⚠️ Products already exist, skipping seeding.");
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
