// Get modal and button elements
const openModal = (document) => {
  const modal = document.getElementById("historyModal");
  const historyBtn = document.getElementById("historyBtn");
  const closeBtn = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  historyBtn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

export default openModal;
