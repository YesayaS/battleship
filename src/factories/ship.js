export class Ship {
  #length;
  #hits;
  #sunk;
  constructor(l) {
    this.#length = parseInt(l);
    this.#hits = 0;
    this.#sunk = false;
  }
  hits() {
    this.#hits += 1;
    this.isSunk();
    this.#sunk = this.#length === this.#hits ? true : false;
  }
  isSunk() {
    return this.#sunk;
  }
}
