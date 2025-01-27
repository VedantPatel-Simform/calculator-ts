function history() {
  return {
    arr: [],

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
      localStorage.setItem("calculatorHistory", JSON.stringify(this.arr)); // Save cleared history to localStorage
    },

    add: function (obj) {
      this.arr.push(obj);
      this.updateHistoryModal();
      localStorage.setItem("calculatorHistory", JSON.stringify(this.arr)); // Save new history to localStorage
    },

    updateHistoryModal: function () {
      const historyDiv = document.querySelector(".history");
      historyDiv.innerHTML = "";

      for (let i = 0; i < this.arr.length; i++) {
        const historyItem = this.arr[i];

        const historyItemHTML = `
          <div class="item">
            <div class="expression">${historyItem.expression}</div>
            <div class="ans">${historyItem.ans}</div>
          </div>
        `;

        historyDiv.insertAdjacentHTML("beforeend", historyItemHTML);
      }
    },
  };
}

export default history;
