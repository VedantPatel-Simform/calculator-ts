function stack() {
  let arr = [];

  return {
    peek: function () {
      return arr[arr.length - 1];
    },
    pop: function () {
      return arr.pop();
    },
    push: function (val) {
      arr.push(val);
    },
    isEmpty: function () {
      return arr.length == 0;
    },
  };
}

export default stack;
