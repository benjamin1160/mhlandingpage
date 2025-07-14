// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const demoHomes = [
    {
      name: "Sunshine",
      bedrooms: 2,
      bathrooms: 1,
      style: "Modern",
      budget: "Under $100k",
      image: "/sunshine-320.png",
    },
    {
      name: "Everest",
      bedrooms: 3,
      bathrooms: 2,
      style: "Farmhouse",
      budget: "$100k–$150k",
      image: "/clayton-everest.png",
    },
    {
      name: "Heritage",
      bedrooms: 4,
      bathrooms: 3,
      style: "Traditional",
      budget: "$150k+",
      image: "/home-placeholder.png",
    },
  ];

  for (const h of demoHomes) {
    const home = await db.home.create({ data: h });
    await db.listing.createMany({
      data: [
        { title: "Listing A", price: "$100k", homeId: home.id },
        { title: "Listing B", price: "$110k", homeId: home.id },
      ],
    });
  }
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
