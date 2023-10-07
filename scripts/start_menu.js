function toggleStartMenu(override = null) {
  let startMenu = document.getElementById("start_menu");

  if (override === "none") {
    startMenu.style.display = "none";
    return;
  }

  if (override === "flex") {
    startMenu.style.display = "block";
    return;
  }

  if (startMenu.style.display === "none") {
    startMenu.style.display = "flex";
  } else {
    startMenu.style.display = "none";
  }
}