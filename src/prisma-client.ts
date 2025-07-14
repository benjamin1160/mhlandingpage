/*
Fallback PrismaClient implementation using in-memory data.
This file is only used in development builds where the real
generated client is unavailable. It intentionally performs
minimal type checking, so we disable a few eslint rules.
*/
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
    // allow any shape since our stub is flexible
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  }): Promise<Home> {
    const current = getHome(id);
    if (!current) {
      throw new Error(`Home ${id} not found`);
    }

    // handle listings when passed with nested Prisma syntax
    let listings = current.listings;
    if (Array.isArray(data.listings)) {
      listings = data.listings;
    } else if (data.listings?.createMany?.data) {
      listings = data.listings.createMany.data.map(
        (l: { title: string; price: string }) => ({
          title: l.title,
          price: l.price,
        }),
      );
    }

    const updated: Home = {
      ...current,
      ...data,
      listings,
    };

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
