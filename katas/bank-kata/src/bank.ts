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

// TODO: Rename it to Use Case? or ?
function buildDepositFunction(
  accounts: Map<string, Transaction[]>
): DepositFunction {
  return function (accountId: AccountId, amount: DepositAmount) {
    const depositTransaction = createDepositTransaction(amount);

    const transactions = accounts.get(accountId) || [];
    accounts.set(accountId, [...transactions, depositTransaction]);
  };
}

// TODO: Rename it to Use Case? or ?
function buildWithdrawFunction(
  accounts: Map<string, Transaction[]>
): WithdrawFunction {
  return function (accountId: AccountId, amount: WithdrawAmount): void {
    const withdrawalTransaction = createWithdrawalTransaction(amount);

    const transactions = accounts.get(accountId) || [];
    accounts.set(accountId, [...transactions, withdrawalTransaction]);
  };
}

// TODO: Rename it to Use Case? or ?
function buildPrintStatementFunction(
  accounts: Map<string, Transaction[]>
): PrintStatementFunction {
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

function bank(
  depositFunction: DepositFunction,
  withdrawFunction: WithdrawFunction,
  printStatementFunction: PrintStatementFunction
): Bank {
  return {
    deposit: depositFunction,
    withdraw: withdrawFunction,
    printStatement: printStatementFunction,
  };
}

export {
  bank,
  Bank,
  buildDepositFunction,
  buildWithdrawFunction,
  buildPrintStatementFunction,
};
