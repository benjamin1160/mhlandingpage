// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const demoHomes = [
    {
      bedrooms: 2,
      style: "Modern",
      budget: "Under $100k",
      image: "/sunshine-320.png",
    },
    {
      bedrooms: 3,
      style: "Farmhouse",
      budget: "$100k–$150k",
      image: "/clayton-everest.png",
    },
    {
      bedrooms: 4,
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
