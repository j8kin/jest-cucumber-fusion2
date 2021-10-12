export type AccountType = 'Account';

export class BankAccount {
  balance: number;
  name: string;
  type: AccountType;

  constructor() {
    this.balance = 0;
    this.name = '';
    this.type = 'Account';
  }

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    this.balance -= amount;
  }
}
