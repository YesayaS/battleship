import { Ship } from "./ship";

export class GameBoard {
  constructor(board) {
    this.board = board || [];
  }
  coordinateToTile(coordinate) {
    const x = coordinate[0];
    const y = coordinate[1];
    return this.board[x][y];
  }

  checkTile(coordinate) {
    const x = coordinate[0];
    const y = coordinate[1];
    const tile = this.coordinateToTile(coordinate);
    const boardLength = this.board.length;
    if (x < 0 || x > boardLength || y < 0 || y > boardLength) {
      throw new Error("coordinate outside the board");
    }
    return tile.isFilled || tile.isAttacked;
  }

  addShip(coordinate, shipLength) {
    const checkTile = this.checkTile(coordinate);
    if (checkTile) return false;
    else {
      const tile = this.coordinateToTile(coordinate);
      const ship = new Ship(shipLength);
      tile.isFilled = true;
      tile.ship = ship;
      return true;
    }
  }

  receiveAttack(coordinate) {
    const tile = this.coordinateToTile(coordinate);
    if (!tile.isAttacked) {
      tile.isAttacked = true;
      if (tile.ship !== null) {
        tile.ship.hits();
        tile.shipHit = true;
      }
      return true;
    }
    return false;
  }

  isAllSunk() {
    const shipsTile = this.board
      .flat()
      .filter((tile) => tile.ship !== null)
      .map((tile) => tile.ship);
    const ships = [...new Set(shipsTile)];
    const shipsSunkStatus = ships.map((ship) => ship.isSunk());
    if (shipsSunkStatus.includes(false)) return false;
    else return true;
  }
}

export class Tile {
  constructor() {
    this.isFilled = false;
    this.isAttacked = false;
    this.ship = null;
    this.shipHit = false;
  }
}
