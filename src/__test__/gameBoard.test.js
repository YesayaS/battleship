import { GameBoard, Tile } from "../app/game-logic/gameBoard";

describe("GameBoard", () => {
  const boardSize = 8;
  const board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => new Tile()),
  );
  const gb = new GameBoard(board);
  test("Should return false on outbound coordinate", () => {
    expect(gb.addShip([0, 10], 1, "h")).toBe(false);
  });
  test("Should return false on outbound coordinate", () => {
    expect(gb.addShip([-1, 5], 1, "v")).toBe(false);
  });

  test("Should able add horizontal ship on empty tile", () => {
    expect(gb.addShip([0, 0], 2, "h")).toBe(true);
  });
  test("Should NOT able add ship on filled tile", () => {
    expect(gb.addShip([1, 0], 1)).toBe(false);
  });
  test("Should able add vertical ship on empty tile", () => {
    expect(gb.addShip([0, 5], 1, "v")).toBe(true);
    gb.receiveAttack([0, 5]);
  });

  test("Board should receive attack on empty tile", () => {
    expect(gb.receiveAttack([0, 1])).toBe(true);
  });
  test("Board should NOT receive attack on attacked tile", () => {
    expect(gb.receiveAttack([0, 1])).toBe(false);
  });
  test("Should tell all ship is not sunk", () => {
    expect(gb.isAllSunk()).toBe(false);
  });

  test("Board should receive ship hit", () => {
    gb.receiveAttack([0, 0]);
    expect(gb.board[0][0].shipHit).toBe(true);
  });
  test("Board should tell all ship is sunk", () => {
    gb.receiveAttack([1, 0]);
    expect(gb.isAllSunk()).toBe(true);
  });
});
