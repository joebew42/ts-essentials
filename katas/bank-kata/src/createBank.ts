import { bank, Bank } from "./bank";

function createBank(): Bank {
  const accounts = new Map<string, number>();

  return bank(accounts);
}

export default createBank;
