type AccountId = string;
type DepositAmount = number;
type WithdrawAmount = number;

type DepositFunction = (accountId: AccountId, amount: DepositAmount) => void;
type WithdrawFunction = (accountId: AccountId, amount: WithdrawAmount) => void;
type PrintStatementFunction = () => void;

type Bank = {
  deposit: DepositFunction;
  withdraw: WithdrawFunction;
  printStatement: PrintStatementFunction;
};

function bank(accounts: Map<string, number>): Bank {
  return {
    deposit: function (accountId: AccountId, amount: DepositAmount): void {
      const balance = accounts.get(accountId);
      accounts.set(accountId, balance + amount);
    },
    withdraw: function (accountId: AccountId, amount: WithdrawAmount): void {
      const balance = accounts.get(accountId);
      accounts.set(accountId, balance - amount);
    },
    printStatement: function (): void {
      console.log("Hello world");
    },
  };
}

export { bank, Bank };
