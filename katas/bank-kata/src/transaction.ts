type DepositTransaction = {
  amount: number;
};

type WithdrawalTransaction = {
  amount: number;
};

type Transaction = DepositTransaction | WithdrawalTransaction;

export default Transaction;
