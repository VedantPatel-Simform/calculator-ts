const openModal = (document) => {
    const modal = document.getElementById("historyModal");
    const historyBtn = document.getElementById("historyBtn");
    const closeBtn = document.getElementsByClassName("close")[0];
    historyBtn.onclick = function () {
        modal.style.display = "block";
    };
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};
export default openModal;
