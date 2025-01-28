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
    log: function () {
      console.log("stack = ", arr);
    },
  };
}

export default stack;
