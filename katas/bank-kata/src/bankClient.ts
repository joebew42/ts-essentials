import {
  createDepositTransaction,
  createWithdrawalTransaction,
  Transaction,
  TransactionType,
} from "./transaction";

type AccountId = string;
type DepositAmount = number;
type WithdrawAmount = number;

type DepositAmountToAccount = (
  accountId: AccountId,
  amount: DepositAmount
) => void;

type WithdrawAmountFrom = (
  accountId: AccountId,
  amount: WithdrawAmount
) => void;

type PrintStatementForAccount = (accountId: AccountId) => void;

type BankClient = {
  deposit: DepositAmountToAccount;
  withdraw: WithdrawAmountFrom;
  printStatement: PrintStatementForAccount;
};

// TODO: Rename it to Use Case? or ?
function createDepositAmountToAccount(
  accounts: Map<string, Transaction[]>
): DepositAmountToAccount {
  return function (accountId: AccountId, amount: DepositAmount) {
    const depositTransaction = createDepositTransaction(amount);

    const transactions = accounts.get(accountId) || [];
    accounts.set(accountId, [...transactions, depositTransaction]);
  };
}

// TODO: Rename it to Use Case? or ?
function createWithdrawAmountFromAccount(
  accounts: Map<string, Transaction[]>
): WithdrawAmountFrom {
  return function (accountId: AccountId, amount: WithdrawAmount): void {
    const withdrawalTransaction = createWithdrawalTransaction(amount);

    const transactions = accounts.get(accountId) || [];
    accounts.set(accountId, [...transactions, withdrawalTransaction]);
  };
}

// TODO: Rename it to Use Case? or ?
function createPrintStatementForAccount(
  accounts: Map<string, Transaction[]>
): PrintStatementForAccount {
  return function (accountId: AccountId): void {
    const transactions = accounts.get(accountId) || [];
    const accountTotalAmount = transactions.reduce(
      (acc, curr) =>
        curr.type === TransactionType.Deposit
          ? acc + curr.amount.value
          : acc - curr.amount.value,
      0
    );

    console.log(`Bank Statement for ${accountId}: ${accountTotalAmount}`);
  };
}

export {
  BankClient,
  createDepositAmountToAccount,
  createWithdrawAmountFromAccount,
  createPrintStatementForAccount,
};
