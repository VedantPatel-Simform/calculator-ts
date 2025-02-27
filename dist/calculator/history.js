function history() {
    return {
        arr: [],
        init() {
            const savedHistory = localStorage.getItem("calculatorHistory");
            if (savedHistory) {
                this.arr = JSON.parse(savedHistory);
                this.updateHistoryModal();
            }
        },
        clearHistory() {
            this.arr = [];
            this.updateHistoryModal();
            localStorage.setItem("calculatorHistory", JSON.stringify(this.arr));
        },
        add(temp) {
            this.arr.push(temp);
            this.updateHistoryModal();
            localStorage.setItem("calculatorHistory", JSON.stringify(this.arr));
        },
        updateHistoryModal() {
            const historyDiv = document.querySelector(".history");
            if (!historyDiv)
                return;
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
