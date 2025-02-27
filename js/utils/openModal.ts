const openModal = (document: Document) => {
  const modal: HTMLDivElement = document.getElementById(
    "historyModal"
  ) as HTMLDivElement;
  const historyBtn = document.getElementById("historyBtn") as HTMLButtonElement;
  const closeBtn = document.getElementsByClassName(
    "close"
  )[0] as HTMLButtonElement;

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
