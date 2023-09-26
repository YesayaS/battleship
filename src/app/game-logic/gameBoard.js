import { Ship } from "./ship";

export class GameBoard {
  constructor(board) {
    this.board = board || [];
    this.boardLength = this.board.length;
  }
  #coordinateToTile(coordinate) {
    const x = coordinate[0];
    const y = coordinate[1];
    return this.board[y][x];
  }

  #postitionInboundBoard(coordinate) {
    const [x, y] = coordinate;
    return x >= 0 && x < this.boardLength && y >= 0 && y < this.boardLength;
  }

  #availableTile(coordinate) {
    const tile = this.#coordinateToTile(coordinate);
    return tile.ship === null && !tile.isAttacked;
  }

  #availableTiles(coordinate, shipLength, orientation) {
    let [x, y] = coordinate;
    for (let i = 0; i < shipLength; i++) {
      const inboundCoordinate = this.#postitionInboundBoard([x, y]);
      if (inboundCoordinate) {
        const availableTile = this.#availableTile([x, y]);
        if (availableTile) {
          if (orientation === "v") {
            y += 1;
          } else x += 1;
        } else return false;
      } else {
        return false;
      }
    }
    return true;
  }

  addShip(coordinate, shipLength, orientation) {
    const availableTiles = this.#availableTiles(
      coordinate,
      shipLength,
      orientation,
    );
    if (availableTiles) {
      let [x, y] = coordinate;
      const ship = new Ship(shipLength);
      for (let i = 0; i < shipLength; i++) {
        const tile = this.#coordinateToTile([x, y]);

        tile.ship = ship;
        if (orientation === "v") {
          y += 1;
        } else x += 1;
      }
      return true;
    }
    return false;
  }

  receiveAttack(coordinate) {
    const tile = this.#coordinateToTile(coordinate);
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
    this.isAttacked = false;
    this.ship = null;
    this.shipHit = false;
  }
}
