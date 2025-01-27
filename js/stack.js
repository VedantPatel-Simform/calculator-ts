function stack() {
  return {
    arr: [],
    peek: function () {
      return this.arr[this.arr.length - 1];
    },
    push: function (val) {
      this.arr.push(val);
    },
    pop: function () {
      let val = this.arr.pop();
      return val;
    },
    length: function () {
      return this.arr.length;
    },
    isEmpty: function () {
      return !this.arr.length;
    },
  };
}

export default stack;
