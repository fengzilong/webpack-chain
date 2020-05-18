const cloneDeep = require('clone-deep');
const Chainable = require('./Chainable');

module.exports = class extends Chainable {
  constructor(parent) {
    super(parent);
    this.store = new Set();
  }
  
  clone() {
    const Ctor = this.constructor;
    const cloned = new Ctor(this.parent);
    cloned.store = cloneDeep(this.store);
    return cloned;
  }

  add(value) {
    this.store.add(value);
    return this;
  }

  prepend(value) {
    this.store = new Set([value, ...this.store]);
    return this;
  }

  clear() {
    this.store.clear();
    return this;
  }

  delete(value) {
    this.store.delete(value);
    return this;
  }

  values() {
    return [...this.store];
  }

  has(value) {
    return this.store.has(value);
  }

  merge(arr) {
    this.store = new Set([...this.store, ...arr]);
    return this;
  }

  when(
    condition,
    whenTruthy = Function.prototype,
    whenFalsy = Function.prototype,
  ) {
    if (condition) {
      whenTruthy(this);
    } else {
      whenFalsy(this);
    }

    return this;
  }
};
