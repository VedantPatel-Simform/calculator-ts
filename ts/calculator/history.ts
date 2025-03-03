interface HistoryItem {
  expression: string;
  ans: number;
}

interface History {
  arr: HistoryItem[];
  init(): void;
  clearHistory(): void;
  add(temp: HistoryItem): void;
  updateHistoryModal(): void;
}

function history(): History {
  return {
    arr: [],

    init() {
      const savedHistory = localStorage.getItem("calculatorHistory");
      if (savedHistory) {
        this.arr = JSON.parse(savedHistory) as HistoryItem[];
        this.updateHistoryModal();
      }
    },

    clearHistory() {
      this.arr = [];
      this.updateHistoryModal();
      localStorage.setItem("calculatorHistory", JSON.stringify(this.arr));
    },

    add(temp: HistoryItem) {
      this.arr.push(temp);
      this.updateHistoryModal();
      localStorage.setItem("calculatorHistory", JSON.stringify(this.arr));
    },

    updateHistoryModal() {
      const historyDiv = document.querySelector(".history") as HTMLElement;
      if (!historyDiv) return;

      historyDiv.innerHTML = "";

      this.arr.forEach((historyItem) => {
        historyDiv.innerHTML += `
          <div class="item">
            <div class="expression">${historyItem.expression}</div>
            <div class="ans">${historyItem.ans}</div>
          </div>
        `;
      });
    },
  };
}

export default history;
