export interface Home {
  slug: string;
  model: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  image: string;
}

export const homes: Home[] = [
  {
    slug: 'sunshine-2-1',
    model: 'Sunshine',
    city: 'Fort Myers',
    price: 90000,
    beds: 2,
    baths: 1,
    image: '/sunshine-320.png',
  },
  {
    slug: 'everest-3-2',
    model: 'Everest',
    city: 'Cape Coral',
    price: 120000,
    beds: 3,
    baths: 2,
    image: '/clayton-everest.png',
  },
  {
    slug: 'heritage-4-3',
    model: 'Heritage',
    city: 'Naples',
    price: 160000,
    beds: 4,
    baths: 3,
    image: '/home-placeholder.png',
  },
];
