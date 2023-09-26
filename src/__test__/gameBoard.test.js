import { GameBoard, Tile } from "../app/game-logic/gameBoard";

describe("GameBoard", () => {
  const boardSize = 8;
  const board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => new Tile()),
  );
  const gb = new GameBoard(board);
  test("All initial board tile should false", () => {
    expect(gb.checkTile([0, 5])).toBe(false);
  });
  test("Board should throw error", () => {
    expect(() => gb.addShip([0, 10], 1)).toThrow(Error);
  });
  test("Board should throw error", () => {
    expect(() => gb.addShip([-1, 5], 1)).toThrow(Error);
  });
  test("Board should able add ship", () => {
    expect(gb.addShip([0, 1], 1)).toBe(true);
  });
  test("Board should NOT able add ship", () => {
    expect(gb.addShip([0, 1], 1)).toBe(false);
  });
  test("Board should receive empty tile hit", () => {
    expect(gb.receiveAttack([0, 0])).toBe(true);
  });
  test("Board should receive attacked tile hit", () => {
    expect(gb.receiveAttack([0, 0])).toBe(false);
  });
  test("Board should tell all ship is not sunk", () => {
    expect(gb.isAllSunk()).toBe(false);
  });
  test("Board should receive ship hit", () => {
    gb.receiveAttack([0, 1]);
    expect(gb.board[0][1].shipHit).toBe(true);
  });
  test("Board should tell all ship is sunk", () => {
    expect(gb.isAllSunk()).toBe(true);
  });
});
