export class History {
  _history = [];

  get() {
    return this._history;
  }

  clear() {
    this._history = [];
  }

  add(from, msg) {
    if (this._history.length > 49) {
      this._history.shift();
    }

    this._history.push(`${from}: ${msg}`);
  }
}

export const chatHistory = new History();
export const pollHistory = new History();
