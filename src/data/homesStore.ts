// src/data/homesStore.ts

export type Home = {
  id: number;
  name: string;
  bedrooms: number;
  bathrooms: number;
  style: string;
  budget: string;
  image: string;
  listings: { title: string; price: string }[];
};

// Initial demo data (modify this array at any time to add/remove homes)
let homes: Home[] = [
  {
    id: 1,
    name: "Sunshine",
    bedrooms: 2,
    bathrooms: 1,
    style: "Modern",
    budget: "Under $100k",
    image: "/sunshine-320.png",
    listings: [
      { title: "Cozy Corner", price: "$90k" },
      { title: "Riverside View", price: "$95k" },
    ],
  },
  {
    id: 2,
    name: "Everest",
    bedrooms: 3,
    bathrooms: 2,
    style: "Farmhouse",
    budget: "$100k–$150k",
    image: "/clayton-everest.png",
    listings: [{ title: "Country Charm", price: "$120k" }],
  },
  {
    id: 3,
    name: "Heritage",
    bedrooms: 4,
    bathrooms: 3,
    style: "Traditional",
    budget: "$150k+",
    image: "/home-placeholder.png",
    listings: [
      { title: "Grand Retreat", price: "$160k" },
      { title: "Lake House", price: "$175k" },
    ],
  },
  {
    id: 4,
    name: "Modern Deluxe",
    bedrooms: 3,
    bathrooms: 2,
    style: "Modern",
    budget: "$150k+",
    image: "/sunshine-320.png",
    listings: [{ title: "Urban Oasis", price: "$155k" }],
  },
  {
    id: 5,
    name: "Country Cottage",
    bedrooms: 2,
    bathrooms: 1,
    style: "Farmhouse",
    budget: "Under $100k",
    image: "/clayton-everest.png",
    listings: [{ title: "Cozy Cottage", price: "$85k" }],
  },
];

// CRUD helpers
export function getAllHomes() {
  return homes;
}

export function getHome(id: number) {
  return homes.find((h) => h.id === id);
}

export function updateHome(updated: Home) {
  homes = homes.map((h) => (h.id === updated.id ? updated : h));
  return updated;
}
