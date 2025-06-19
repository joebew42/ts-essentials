import createBankClient from "../../src/createBankClient";

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
    const client = createBankClient();
    const anAccountId = "joe-account-id";

    client.deposit(anAccountId, 100);
    client.withdraw(anAccountId, 50);
    client.deposit(anAccountId, 10);
    client.withdraw(anAccountId, 5);
    client.withdraw(anAccountId, 2);

    client.printStatement(anAccountId);

    expect(consoleOutput).toContain("Bank Statement for joe-account-id: 53");
  });
});
