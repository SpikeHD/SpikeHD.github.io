/**
 * Create a window based on name, using HTML in ./windows (which contains the inner HTML of windows to be displayed)
 */
async function createWindow(name) {
  const title = getNiceName(name)
  const windowManager = document.querySelector('#window_manager')
  const windowBaseHTML = await fetch(`windows/window_base.html`)
  const windowHTML = await fetch(`windows/${name}.html`)
  const html = await windowHTML?.text()

  // Name may not exist or something
  if (!html) return

  const windowBase = document.createElement('div')
  windowBase.className = 'window'
  windowBase.id = 'window_' + name

  // Translate to center (or close enough, doesn't really matter) of screen, and make sure z-index is in front
  const x = Math.round(document.body.clientWidth / 2)
  const y = Math.round(document.body.clientHeight / 2)

  //windowBase.style.transform = `translate(${x}px, ${y}px)`
  windowBase.style.left = `${x}px`
  windowBase.style.top = `${y}px`
  windowBase.style.zIndex = 999

  // Append title and contents sections
  windowBase.innerHTML = await windowBaseHTML.text()
  windowManager.appendChild(windowBase)

  // There now exists an element with the id of "window_[name]", so we can get it and insert our stuff into the "contents" area
  const windowContents = document.querySelector(`#window_${name} .window_contents`)
  const windowTitle = document.querySelector(`#window_${name} .window_title_contents`)
  windowContents.innerHTML = html
  windowTitle.innerHTML = title

  // Make title draggable
  assignTitleDraggable(document.querySelector(`#window_${name} .window_title`))

  // Assign close event to clicking the close button
  const closeBtn = document.querySelector(`#window_${name} .window_actions img`)
  closeBtn.addEventListener('click', () => {
    const window = document.querySelector(`#window_${name}`)
    window.remove()
  })
}

function getNiceName(name) {
  let noUnder = name.replace(/_/g, ' ')
  return noUnder[0].toUpperCase() + noUnder.substring(1)
}