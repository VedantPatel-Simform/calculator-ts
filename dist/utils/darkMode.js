function setMode(document) {
    const dark = document.getElementById("dark");
    const light = document.getElementById("light");
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
