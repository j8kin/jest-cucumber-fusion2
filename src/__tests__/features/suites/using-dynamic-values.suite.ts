import { Before, Given, When, Then, Fusion } from '../../../index';
import { AccountType, BankAccount } from '../../src/bank-account';
import { stepArgType } from '../step-definitions/step-helpers';

let myAccounts: BankAccount[];

Before(() => {
  myAccounts = [];
});

Given(
  /^I open new account with '(.+)' name$/,
  (newAccountName: stepArgType) => {
    if (typeof newAccountName !== 'string')
      throw new Error('Invalid step parametertype');
    myAccounts.push(new BankAccount());
    myAccounts[myAccounts.length - 1].name = newAccountName;
  }
);

Given(
  /^my account#(\d+) balance is \$(\d+)$/,
  (nAcc: stepArgType, balance: stepArgType) => {
    if (typeof nAcc !== 'string') throw new Error('Invalid step parametertype');
    if (typeof balance !== 'string')
      throw new Error('Invalid step parametertype');
    myAccounts[Number(nAcc) - 1].deposit(Number(balance));
  }
);

When(
  /^I get paid \$(\d+) for writing some awesome code from my account#(\d+)$/,
  (paycheck: stepArgType, nAcc: stepArgType) => {
    if (typeof nAcc !== 'string') throw new Error('Invalid step parametertype');
    if (typeof paycheck !== 'string')
      throw new Error('Invalid step parametertype');
    myAccounts[Number(nAcc) - 1].deposit(Number(paycheck));
  }
);

Then(
  /^my account#(\d+) balance should be \$(\d+)$/,
  (nAcc: stepArgType, expectedBalance: stepArgType) => {
    if (typeof nAcc !== 'string') throw new Error('Invalid step parametertype');
    if (typeof expectedBalance !== 'string')
      throw new Error('Invalid step parametertype');
    expect(myAccounts[Number(nAcc) - 1].balance).toBe(Number(expectedBalance));
  }
);

Then(/^I have (\d+) accounts$/, (nAccounts: stepArgType) => {
  if (typeof nAccounts !== 'string')
    throw new Error('Invalid step parametertype');
  expect(myAccounts.length).toBe(Number(nAccounts));
});

Given(
  /^my account#(\d+) name is '(.*)'$/,
  (nAcc: stepArgType, nameAccount: stepArgType) => {
    if (typeof nAcc !== 'string') throw new Error('Invalid step parametertype');
    if (typeof nameAccount !== 'string')
      throw new Error('Invalid step parametertype');

    myAccounts[Number(nAcc) - 1].name = nameAccount;
  }
);

When(
  /^I get an new account#(\d+) name '(.*)' with a type (.*) from my old account named '(.*)'$/,
  (
    nAcc: stepArgType,
    nameNewAccount: stepArgType,
    typeAccount: stepArgType,
    nameOldAccount: stepArgType
  ) => {
    if (typeof nAcc !== 'string') throw new Error('Invalid step parametertype');
    if (typeof nameNewAccount !== 'string')
      throw new Error('Invalid step parametertype');
    if (typeof typeAccount !== 'string')
      throw new Error('Invalid step parametertype');

    myAccounts[Number(nAcc) - 1].name = nameNewAccount;
    myAccounts[Number(nAcc) - 1].type = typeAccount as AccountType;
  }
);

Then(
  /^my account#(\d+) name should be "(.*)" and have a type (.*)$/,
  (nAcc: stepArgType, nameAccount: stepArgType, typeAccount: stepArgType) => {
    if (typeof nAcc !== 'string') throw new Error('Invalid step parametertype');
    if (typeof nameAccount !== 'string')
      throw new Error('Invalid step parametertype');
    if (typeof typeAccount !== 'string')
      throw new Error('Invalid step parametertype');

    expect(myAccounts[Number(nAcc) - 1].name).toBe(nameAccount);
    expect(myAccounts[Number(nAcc) - 1].type).toBe(typeAccount);
  }
);

Then(
  /^my account#(\d+) should be:$/,
  (nAcc: stepArgType, table: stepArgType) => {
    if (typeof nAcc !== 'string') throw new Error('Invalid step parametertype');
    if (typeof table === 'string')
      throw new Error('Invalid step parametertype');

    for (const [key, value] of Object.entries(myAccounts[Number(nAcc) - 1])) {
      table.forEach((row) => {
        if (row.field === key) {
          expect(value.toString()).toBe(row.value);
        }
      });
    }
  }
);

Fusion('../using-dynamic-values.feature');
