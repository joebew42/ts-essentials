enum TransactionType {
  Deposit = "deposit",
  Withdrawal = "withdrawal",
}

type TransactionAmount = {
  value: number;
} & { readonly __brand: unique symbol };

type DepositTransaction = {
  type: TransactionType.Deposit;
  amount: TransactionAmount;
} & { readonly __brand: unique symbol };

type WithdrawalTransaction = {
  type: TransactionType.Withdrawal;
  amount: TransactionAmount;
} & { readonly __brand: unique symbol };

type Transaction = DepositTransaction | WithdrawalTransaction;

function transactionAmountOf(amount: number): TransactionAmount {
  if (amount < 1) {
    throw new Error("Amount cannot be negative");
  }

  return {
    value: amount,
  } as TransactionAmount;
}

function createDepositTransaction(amount: number): DepositTransaction {
  return {
    type: TransactionType.Deposit,
    amount: transactionAmountOf(amount),
  } as DepositTransaction;
}

function createWithdrawalTransaction(amount: number): WithdrawalTransaction {
  return {
    type: TransactionType.Withdrawal,
    amount: transactionAmountOf(amount),
  } as WithdrawalTransaction;
}

export {
  Transaction,
  TransactionType,
  createDepositTransaction,
  createWithdrawalTransaction,
};
