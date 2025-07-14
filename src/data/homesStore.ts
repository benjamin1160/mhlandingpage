// src/data/homesStore.ts

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

export type Home = {
  id: number;
  bedrooms: number;
  style: string;
  budget: string;
  image: string;
  listings: { title: string; price: string }[];
};

const dataFile = join(process.cwd(), "src/data/homes.json");

function readHomes(): Home[] {
  const raw = readFileSync(dataFile, "utf8");
  return JSON.parse(raw) as Home[];
}

function writeHomes(homes: Home[]) {
  writeFileSync(dataFile, JSON.stringify(homes, null, 2));
}

export function getAllHomes() {
  return readHomes();
}

export function getHome(id: number) {
  return readHomes().find((h) => h.id === id);
}

export function updateHome(updated: Home) {
  const homes = readHomes();
  const idx = homes.findIndex((h) => h.id === updated.id);
  if (idx >= 0) {
    homes[idx] = updated;
  } else {
    homes.push(updated);
  }
  writeHomes(homes);
  return updated;
}
