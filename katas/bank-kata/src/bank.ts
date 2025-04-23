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

function bank(accounts: Map<string, Transaction>): Bank {
  return {
    deposit: function (accountId: AccountId, amount: DepositAmount): void {
      const { amount: balance } = accounts.get(accountId) || { amount: 0 };
      accounts.set(accountId, { amount: balance + amount });
    },
    withdraw: function (accountId: AccountId, amount: WithdrawAmount): void {
      const { amount: balance } = accounts.get(accountId) || { amount: 0 };
      accounts.set(accountId, { amount: balance - amount });
    },
    printStatement: function (accountId: AccountId): void {
      console.log(
        `Bank Statement for ${accountId}: ${accounts.get(accountId).amount}`
      );
    },
  };
}

export { bank, Bank };
