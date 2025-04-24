enum TransactionType {
  Deposit = "deposit",
  Withdrawal = "withdrawal",
}

type DepositTransaction = {
  type: TransactionType.Deposit;
  amount: number;
};

type WithdrawalTransaction = {
  type: TransactionType.Withdrawal;
  amount: number;
};

type Transaction = DepositTransaction | WithdrawalTransaction;

export { Transaction, TransactionType }; // TODO: TransactionType should not leak?
