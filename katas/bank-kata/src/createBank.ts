import {
  bank,
  Bank,
  buildDepositFunction,
  buildPrintStatementFunction,
  buildWithdrawFunction,
} from "./bank";

import { Transaction } from "./transaction";

function createBank(): Bank {
  const accounts = new Map<string, Transaction[]>();
  const depositFunction = buildDepositFunction(accounts);
  const withdrawFunction = buildWithdrawFunction(accounts);
  const printStatementFunction = buildPrintStatementFunction(accounts);

  return bank(depositFunction, withdrawFunction, printStatementFunction);
}

export default createBank;
