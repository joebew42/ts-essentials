import { bank, Bank } from "./bank";

import Transaction from "./transaction";

function createBank(): Bank {
  const accounts = new Map<string, Transaction>();

  return bank(accounts);
}

export default createBank;
