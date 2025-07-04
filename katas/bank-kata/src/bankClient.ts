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

type AppendTransactionTo = (
  accountId: AccountId,
  transaction: Transaction
) => void;

function createAppendTransactionTo(
  accounts: Map<string, Transaction[]>
): AppendTransactionTo {
  return function (accountId: AccountId, transaction: Transaction) {
    const transactions = accounts.get(accountId) || [];
    const updatedTransactions = [...transactions, transaction];
    accounts.set(accountId, updatedTransactions);
  };
}

function createDepositAmountToAccount(
  appendTransactionTo: AppendTransactionTo
): DepositAmountToAccount {
  return function (accountId: AccountId, amount: DepositAmount) {
    const depositTransaction = createDepositTransaction(amount);
    appendTransactionTo(accountId, depositTransaction);
  };
}

function createWithdrawAmountFromAccount(
  accounts: Map<string, Transaction[]>
): WithdrawAmountFrom {
  return function (accountId: AccountId, amount: WithdrawAmount): void {
    const withdrawalTransaction = createWithdrawalTransaction(amount);

    const transactions = accounts.get(accountId) || [];
    accounts.set(accountId, [...transactions, withdrawalTransaction]);
  };
}

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
  createAppendTransactionTo,
  createDepositAmountToAccount,
  createWithdrawAmountFromAccount,
  createPrintStatementForAccount,
};
