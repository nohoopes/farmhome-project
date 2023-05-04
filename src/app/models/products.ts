export class Product {
    id: number = 0;
    name: string = '';
    weight: number = 0;
    remainingWeight: number = 0;
    unit: string = '';
    season: string = '';
    description: string = '';
    date: string = '';
    suggestPrice: string = '';
    images!: Array<{ id: number; url: string; }>;
  }