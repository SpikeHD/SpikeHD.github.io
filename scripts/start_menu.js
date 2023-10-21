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

async function shutdown() {
  await wait(500)

  // Close all windows
  const closeBtns = document.querySelectorAll(".window_actions img");
  
  for (const btn of closeBtns) {
    btn.click();
    await wait(100);
  }

  // make desktop icons disappear
  await wait(500);

  let icons = document.getElementById("desktop_icons");
  icons.style.opacity = 0;

  // Then the taskbar
  await wait(1000);

  let taskbar = document.getElementById("taskbar");
  taskbar.style.opacity = 0;

  // Then show #shut_down
  await wait(1000);

  let shutDown = document.getElementById("shutdown");
  shutDown.style.display = "flex";

  // Then wait a bit and show black screen
  await wait(5000);

  let blackScreen = document.getElementById("blackscreen");
  blackScreen.style.display = "block";

  shutDown.style.display = "none";
}