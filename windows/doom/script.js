let DoomModule, callMain

/**
 * Almost all of this code is yoinked from the Cloudflare WASM DOOM port, which I compiled for this project.
 * 
 * You can look at it all here! https://github.com/cloudflare/doom-wasm
 */
async function initDoomModule() {
  await createWindow('doom', 'windows/doom/doom.html')

  await wait(200)

  getModule()
  startDoom()
}

function getModule() {
  var commonArgs = ["-iwad", "doom1.wad", "-window", "-nogui", "-nomusic", "-config", "default.cfg"];

  DoomModule = {
    onRuntimeInitialized: () => {
      callMain(commonArgs);
    },
    noInitialRun: true,
    preRun: () => {
      DoomModule.FS.createPreloadedFile("", "doom1.wad", "windows/doom/doom1.wad", true, true);
      DoomModule.FS.createPreloadedFile("", "default.cfg", "windows/doom/default.cfg", true, true);
    },
    printErr: function (text) {
      if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");
      console.error(text);
    },
    canvas: (function () {
      var canvas = document.getElementById("doom_canvas");
      canvas.addEventListener(
        "webglcontextlost",
        function (e) {
          alert("WebGL context lost. You will need to reload the page.");
          e.preventDefault();
        },
        false
      );
      return canvas;
    })(),
    print: function (text) {
      console.log(text);
    },
    setStatus: function (text) {
      console.log(text);
    },
    totalDependencies: 0,
    monitorRunDependencies: function (left) {
      this.totalDependencies = Math.max(this.totalDependencies, left);
      DoomModule.setStatus(left ? "Preparing... (" + (this.totalDependencies - left) + "/" + this.totalDependencies +
        ")" : "All downloads complete.");
    },
  };

  window.onerror = function (event) {
    DoomModule.setStatus("Exception thrown, see JavaScript console");
    DoomModule.setStatus = function (text) {
      if (text) DoomModule.printErr("[post-exception status] " + text);
    };
  };

  return DoomModule
}