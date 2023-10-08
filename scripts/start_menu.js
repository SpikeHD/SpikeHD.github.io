function toggleStartMenu(override = null) {
  let startMenu = document.getElementById("start_menu");
  let desktop = document.getElementById("desktop");

  let closeEvt = () => {
    toggleStartMenu("none");
    desktop.removeEventListener("click", closeEvt);
  };

  if (override) {
    if (override !== "none") {
      desktop.addEventListener("click", closeEvt);
    }

    startMenu.style.display = override;
    return;
  }

  if (startMenuOpen()) {
    startMenu.style.display = "none";
  } else {
    startMenu.style.display = "flex";

    // This sucks
    setTimeout(() => desktop.addEventListener("click", closeEvt), 100);
  }
}

function startMenuOpen() {
  let startMenu = document.getElementById("start_menu");
  return startMenu.style.display === "flex";
}
