export interface City {
  slug: string;
  name: string;
  description: string;
  parks: string[];
}

export const cities: City[] = [
  {
    slug: 'fort-myers',
    name: 'Fort Myers',
    description: 'Discover affordable mobile homes in sunny Fort Myers.',
    parks: ['Sunshine Park', 'Riverbend Park'],
  },
  {
    slug: 'cape-coral',
    name: 'Cape Coral',
    description: 'Explore mobile home living in vibrant Cape Coral.',
    parks: ['Harbor View Park', 'Lakeside Park'],
  },
];
