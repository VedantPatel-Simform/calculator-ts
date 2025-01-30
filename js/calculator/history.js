function history() {
  return {
    arr: [],
    this: this,
    init: function () {
      const savedHistory = localStorage.getItem("calculatorHistory");
      if (savedHistory) {
        this.arr = JSON.parse(savedHistory); // use this instead of this
        this.updateHistoryModal();
      }
    },

    clearHistory: function () {
      this.arr = [];
      this.updateHistoryModal();
      localStorage.setItem("calculatorHistory", JSON.stringify(this.arr));
    },

    add: function (temp) {
      this.arr.push(temp); // use this instead of this
      this.updateHistoryModal();
      localStorage.setItem("calculatorHistory", JSON.stringify(this.arr));
    },

    updateHistoryModal: function () {
      const historyDiv = document.querySelector(".history");
      historyDiv.innerHTML = "";

      for (let i = 0; i < this.arr.length; i++) {
        let historyItem = this.arr[i];

        historyDiv.innerHTML += `
          <div class="item">
            <div class="expression">${historyItem.expression}</div>
            <div class="ans">${historyItem.ans}</div>
          </div>
        `;
      }
    },
  };
}

export default history;
