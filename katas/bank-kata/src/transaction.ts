// TODO: Try to extract this in its own module
enum EitherType {
  Left = "left",
  Right = "right",
}

type EitherLeft<T> = {
  type: EitherType.Left;
  value: T;
} & { readonly __brand: unique symbol };

type EitherRight<T> = {
  type: EitherType.Right;
  value: T;
} & { readonly __brand: unique symbol };

type Either<L, R> = EitherLeft<L> | EitherRight<R>;

function eitherLeft<T>(value: T): EitherLeft<T> {
  return {
    type: EitherType.Left,
    value,
  } as EitherLeft<T>;
}

function eitherRight<T>(value: T): EitherRight<T> {
  return {
    type: EitherType.Right,
    value,
  } as EitherRight<T>;
}

type NonValid = {
  type: "non-valid";
  reason: string;
} & { readonly __brand: unique symbol };

function nonValid(reason: string): NonValid {
  return {
    reason,
  } as NonValid;
}
// End TODO

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
