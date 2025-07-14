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
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src/data/homesData.json");

function loadHomes(): Home[] {
  try {
    const raw = readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw) as Home[];
  } catch {
    return [];
  }
}

let homes: Home[] = loadHomes();

function saveHomes() {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(homes, null, 2));
  } catch {
    // ignore write errors in read-only environments
  }
}

// CRUD helpers
export function getAllHomes() {
  return homes;
}

export function getHome(id: number) {
  return homes.find((h) => h.id === id);
}

export function updateHome(updated: Home) {
  homes = homes.map((h) => (h.id === updated.id ? updated : h));
  saveHomes();
  return updated;
}

export function addHome(data: Omit<Home, "id">) {
  const nextId = homes.length ? Math.max(...homes.map((h) => h.id)) + 1 : 1;
  const home: Home = { id: nextId, ...data };
  homes.push(home);
  saveHomes();
  return home;
}

export function deleteHome(id: number) {
  const idx = homes.findIndex((h) => h.id === id);
  if (idx !== -1) {
    homes.splice(idx, 1);
    saveHomes();
    return true;
  }
  return false;
}
