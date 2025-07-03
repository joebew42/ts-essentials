import {
  BankClient,
  createAppendTransactionTo,
  createDepositAmountToAccount,
  createPrintStatementForAccount,
  createWithdrawAmountFromAccount,
} from "./bankClient";

import { Transaction } from "./transaction";

function createBankClient(): BankClient {
  const accounts = new Map<string, Transaction[]>();
  const appendTransactionTo = createAppendTransactionTo(accounts);

  const depositFunction = createDepositAmountToAccount(appendTransactionTo);
  const withdrawFunction = createWithdrawAmountFromAccount(accounts);
  const printStatementFunction = createPrintStatementForAccount(accounts);

  return {
    deposit: depositFunction,
    withdraw: withdrawFunction,
    printStatement: printStatementFunction,
  };
}

export default createBankClient;
