import createBank from "../../src/createBank";

describe("Deposit, Withdrawal and bank statement", () => {
  const realConsoleLog = console.log;
  let consoleOutput = [];

  beforeEach(() => {
    consoleOutput = [];
    console.log = (message) => consoleOutput.push(message);
  });

  afterEach(() => {
    consoleOutput = [];
  });

  afterAll(() => {
    console.log = realConsoleLog;
  });

  it("prints a bank statement with all deposits and withdrawals", () => {
    const bank = createBank();
    const anAccountId = "joe-account-id";

    bank.deposit(anAccountId, 100);
    bank.withdraw(anAccountId, 50);
    bank.deposit(anAccountId, 10);
    bank.withdraw(anAccountId, 5);
    bank.withdraw(anAccountId, 2);

    bank.printStatement(anAccountId);

    expect(consoleOutput).toContain("Bank Statement for joe-account-id");
  });
});
