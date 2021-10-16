export class OnlineSales {
  listedItems: Map<string, number>;

  constructor() {
    this.listedItems = new Map<string, number>([
      ['Autographed Neil deGrasse Tyson book', 100],
      ['Rick Astley t-shirt', 22],
      ['An idea to replace EVERYTHING with blockchains', 0]
    ]);
  }

  hasItem = (name: string): boolean => this.listedItems.has(name);
  allItems = (): string[] => [...this.listedItems.keys()];

  buyItem(name: string, price: number): void {
    this.listedItems.set(name, price);
  }

  changePrice = (name: string, newPrice: number): void => {
    this.listedItems.set(name, newPrice);
  };

  sellItem(name: string): number | undefined {
    if (this.listedItems.has(name)) {
      const sellPrice = this.listedItems.get(name);
      this.listedItems.delete(name);

      return sellPrice;
    } else {
      return undefined;
    }
  }
}
