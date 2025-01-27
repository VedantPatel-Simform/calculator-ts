function history() {
  // using closure
  let arr = [];
  return {
    // Initialize history from localStorage if available
    init: function () {
      const savedHistory = localStorage.getItem("calculatorHistory");
      if (savedHistory) {
        this.arr = JSON.parse(savedHistory);
        this.updateHistoryModal();
      }
    },

    clearHistory: function () {
      this.arr = [];
      this.updateHistoryModal();
      localStorage.setItem("calculatorHistory", JSON.stringify(this.arr));
    },

    add: function (obj) {
      this.arr.push(obj);
      this.updateHistoryModal();
      localStorage.setItem("calculatorHistory", JSON.stringify(this.arr));
    },

    updateHistoryModal: function () {
      const historyDiv = document.querySelector(".history");
      historyDiv.innerHTML = "";

      for (let i = 0; i < this.arr.length; i++) {
        const historyItem = this.arr[i];

        // to add adjecent divs inside the history class
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
