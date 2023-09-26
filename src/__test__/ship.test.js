import { Ship } from "../app/logic/ship";

describe("Ship", () => {
  test("", () => {
    const length = 1;
    const ship = new Ship(length);
    expect(ship.status()).toEqual([length, 0, false]);
    ship.hits();
    expect(ship.status()).toEqual([length, 1, true]);
  });
});
