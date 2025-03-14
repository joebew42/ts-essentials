import { greet } from "../src/greetings";

describe("greet", () => {
  it("returns 'hello'", () => {
    expect(greet()).toBe("hello");
  });
});
