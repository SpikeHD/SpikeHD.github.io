/**
 * Create a window based on name, using HTML in ./windows (which contains the inner HTML of windows to be displayed)
 */
async function createWindow(name) {
  const windowManager = document.querySelector('#window_manager')
  const windowHTML = await fetch('windows/window_base.html')
  const html = await windowHTML.text()

  windowManager.insertAdjacentHTML('afterbegin', html)
}