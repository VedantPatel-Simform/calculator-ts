function setMode(document: Document) {
  const dark: HTMLButtonElement = document.getElementById(
    "dark"
  ) as HTMLButtonElement;
  const light: HTMLButtonElement = document.getElementById(
    "light"
  ) as HTMLButtonElement;
  const body = document.body;

  light.style.display = "none";
  dark.style.display = "block";
  body.style.backgroundColor = "#ffffff";

  dark.addEventListener("click", () => {
    dark.style.display = "none";
    light.style.display = "block";
    body.style.backgroundColor = "#373737";
  });

  light.addEventListener("click", () => {
    light.style.display = "none";
    dark.style.display = "block";
    body.style.backgroundColor = "#ffffff";
  });
}

export default setMode;
