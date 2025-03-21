import { chop } from "../src/chop";

describe("chop", () => {
  it("returns -1 for empty array", () => {
    const any_element = 1;

    expect(chop(any_element, [])).toBe(-1);
  });

  it("returns -1 if the element can't be found", () => {
    expect(chop(1, [2])).toBe(-1);
  });

  it("returns the index of the element when found", () => {
    expect(chop(1, [1])).toBe(0);

    expect(chop(1, [1, 3, 5])).toBe(0);
    expect(chop(3, [1, 3, 5])).toBe(1);
    expect(chop(5, [1, 3, 5])).toBe(2);

    expect(chop(0, [1, 3, 5])).toBe(-1);
    expect(chop(2, [1, 3, 5])).toBe(-1);
    expect(chop(4, [1, 3, 5])).toBe(-1);
    expect(chop(6, [1, 3, 5])).toBe(-1);

    expect(chop(1, [1, 3, 5, 7])).toBe(0);
    expect(chop(3, [1, 3, 5, 7])).toBe(1);
    expect(chop(5, [1, 3, 5, 7])).toBe(2);
    expect(chop(7, [1, 3, 5, 7])).toBe(3);

    expect(chop(0, [1, 3, 5, 7])).toBe(-1);
    expect(chop(2, [1, 3, 5, 7])).toBe(-1);
    expect(chop(4, [1, 3, 5, 7])).toBe(-1);
    expect(chop(6, [1, 3, 5, 7])).toBe(-1);
    expect(chop(8, [1, 3, 5, 7])).toBe(-1);
  });
});

/**
 * TODO:
 * - Try to make the `chop` function to be generic
 */
