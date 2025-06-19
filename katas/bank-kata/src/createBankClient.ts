import {
  BankClient,
  buildDepositFunction,
  buildPrintStatementFunction,
  buildWithdrawFunction,
} from "./bankClient";

import { Transaction } from "./transaction";

function createBankClient(): BankClient {
  const accounts = new Map<string, Transaction[]>();
  const depositFunction = buildDepositFunction(accounts);
  const withdrawFunction = buildWithdrawFunction(accounts);
  const printStatementFunction = buildPrintStatementFunction(accounts);

  return {
    deposit: depositFunction,
    withdraw: withdrawFunction,
    printStatement: printStatementFunction,
  };
}

export default createBankClient;
