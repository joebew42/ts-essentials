import {
  createDepositTransaction,
  createWithdrawalTransaction,
  Transaction,
  TransactionType,
} from "./transaction";

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
    // TODO: Extract Use Cases (or Application Services)
    deposit: function (accountId: AccountId, amount: DepositAmount): void {
      const transactions = accounts.get(accountId) || [];
      const depositTransaction = createDepositTransaction(amount);
      accounts.set(accountId, [...transactions, depositTransaction]);
    },
    withdraw: function (accountId: AccountId, amount: WithdrawAmount): void {
      const transactions = accounts.get(accountId) || [];
      const withdrawalTransaction = createWithdrawalTransaction(amount);
      accounts.set(accountId, [...transactions, withdrawalTransaction]);
    },
    printStatement: function (accountId: AccountId): void {
      const transactions = accounts.get(accountId) || [];
      const accountTotalAmount = transactions.reduce(
        (acc, curr) =>
          curr.type === TransactionType.Deposit
            ? acc + curr.amount.value
            : acc - curr.amount.value,
        0
      );

      console.log(`Bank Statement for ${accountId}: ${accountTotalAmount}`);
    },
  };
}

export { bank, Bank };
