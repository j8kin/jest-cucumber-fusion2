const itemPrices: Map<string, number> = new Map<string, number>([
  ['Autographed Neil deGrasse Tyson book', 100],
  ['Rick Astley t-shirt', 22],
  ['An idea to replace EVERYTHING with blockchains', 0]
]);

export class OnlineSales {
  listedItems: string[];

  constructor() {
    this.listedItems = [];
  }

  listItem(name: string): void {
    this.listedItems.push(name);
  }

  sellItem(name: string): number | undefined {
    const itemIndex = this.listedItems.indexOf(name);

    if (itemIndex !== -1) {
      this.listedItems.splice(itemIndex, 1);

      return itemPrices.get(name);
    } else {
      return undefined;
    }
  }
}
