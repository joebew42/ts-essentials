enum TransactionType {
  Deposit = "deposit",
  Withdrawal = "withdrawal",
}

type DepositTransaction = {
  type: TransactionType.Deposit;
  amount: number;
} & { readonly __brand: unique symbol };

type WithdrawalTransaction = {
  type: TransactionType.Withdrawal;
  amount: number;
} & { readonly __brand: unique symbol };

type Transaction = DepositTransaction | WithdrawalTransaction;

function createDepositTransaction(amount: number): DepositTransaction {
  // TODO: Extract a `TransactionAmount` type ?
  if (amount < 1) {
    throw new Error("Amount cannot be negative");
  }

  return {
    type: TransactionType.Deposit,
    amount,
  } as DepositTransaction;
}

function createWithdrawalTransaction(amount: number): WithdrawalTransaction {
  // TODO: Extract a `TransactionAmount` type ?
  if (amount < 1) {
    throw new Error("Amount cannot be negative");
  }

  return {
    type: TransactionType.Withdrawal,
    amount,
  } as WithdrawalTransaction;
}

export {
  Transaction,
  TransactionType,
  createDepositTransaction,
  createWithdrawalTransaction,
};
