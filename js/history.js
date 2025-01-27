function history(document) {
  return {
    arr: [],
    clearHistory: function () {
      this.arr = [];
    },
    addExpression: (obj) => {
      this.arr.push(obj);
    },
  };
}

export default history;
