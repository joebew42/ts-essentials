import Transaction from "./transaction";

type AccountId = string;
type DepositAmount = number;
type WithdrawAmount = number;

type DepositFunction = (accountId: AccountId, amount: DepositAmount) => void;
type WithdrawFunction = (accountId: AccountId, amount: WithdrawAmount) => void;
type PrintStatementFunction = (accountId: AccountId) => void;

type Bank = {
  deposit: DepositFunction;
  withdraw: WithdrawFunction;
  printStatement: PrintStatementFunction;
};

function bank(accounts: Map<string, Transaction[]>): Bank {
  return {
    deposit: function (accountId: AccountId, amount: DepositAmount): void {
      const transactions = accounts.get(accountId) || [];
      accounts.set(accountId, [...transactions, { amount }]);
    },
    withdraw: function (accountId: AccountId, amount: WithdrawAmount): void {
      const transactions = accounts.get(accountId) || [];
      accounts.set(accountId, [...transactions, { amount: -1 * amount }]);
    },
    printStatement: function (accountId: AccountId): void {
      const transactions = accounts.get(accountId) || [];
      const accountTotalAmount = transactions
        .map((t) => t.amount)
        .reduce((acc, curr) => acc + curr, 0);

      console.log(`Bank Statement for ${accountId}: ${accountTotalAmount}`);
    },
  };
}

export { bank, Bank };
