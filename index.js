let btn = document.getElementById("main");
let input = document.getElementById("input");

let lesson = 0;

btn.addEventListener("click", () => {
  input.focus();
});
input.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    document.getElementById("input").value = "";
  }
});
