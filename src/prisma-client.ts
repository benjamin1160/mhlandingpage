/* Fallback PrismaClient implementation using in-memory data */
import { getAllHomes, getHome, updateHome, type Home } from "@/data/homesStore";

let nextId = Math.max(...getAllHomes().map((h) => h.id)) + 1;

class HomeDelegate {
  async findMany({ skip = 0, take = 10 } = {}): Promise<Home[]> {
    const homes = getAllHomes();
    return homes.slice(skip, skip + take);
  }

  async findUnique({
    where: { id },
  }: {
    where: { id: number };
  }): Promise<Home | null> {
    return getHome(id) ?? null;
  }

  async update({
    where: { id },
    data,
  }: {
    where: { id: number };
    data: Omit<Home, "id">;
  }): Promise<Home> {
    const updated: Home = { id, ...data };
    return updateHome(updated);
  }

  async create({ data }: { data: Omit<Home, "id"> }): Promise<Home> {
    const home: Home = { id: nextId++, ...data };
    // use updateHome to add new home
    updateHome(home);
    return home;
  }
}

class ListingDelegate {
  async createMany({
    data,
  }: {
    data: { title: string; price: string; homeId: number }[];
  }): Promise<void> {
    data.forEach((l) => {
      const home = getHome(l.homeId);
      if (home) {
        home.listings.push({ title: l.title, price: l.price });
      }
    });
  }
}

export class PrismaClient {
  home = new HomeDelegate();
  listing = new ListingDelegate();
  async $disconnect() {
    // no-op
  }
  async $connect() {
    // no-op
  }
}
