/**
 * Create a window based on name, using HTML in ./windows (which contains the inner HTML of windows to be displayed)
 */
async function createWindow(name) {
  const title = getNiceName(name)
  const windowManager = document.querySelector('#window_manager')
  const windowBaseHTML = await fetch(`windows/window_base.html`)
  const windowHTML = await fetch(`windows/${name}.html`)
  let html = await windowHTML?.text()

  // Name may not exist or something
  if (!html) return

  // If a window already exists with the name, jsut "focus" it
  const existing = document.querySelector(`#window_${name}`)
  if (existing) {
    // Set other windows to a lesser zindex
    document.querySelectorAll('.window').forEach(e => {
      e.style.zIndex = 998
    })

    existing.style.zIndex = 999
    return
  }

  const windowBase = document.createElement('div')
  windowBase.className = 'window'
  windowBase.id = 'window_' + name

  windowBase.style.zIndex = 999

  // Set height and width in case some are specified
  const icon = document.querySelector(`.desktop_icon[name='${name}']`)
  
  if (icon) {
    if (icon.getAttribute('data-window-width')) {
      windowBase.style.width = `${icon.getAttribute('data-window-width')}px`
    }
    
    if (icon.getAttribute('data-window-height')) {
      windowBase.style.height = `${icon.getAttribute('data-window-height')}px`
    }
  }

  // Append title and contents sections
  windowBase.innerHTML = await windowBaseHTML.text()
  windowManager.appendChild(windowBase)

  // Now apply the position based on width and height, since the element needs to be appended in order to get width/height data
  const x = Math.round(
    (document.body.clientWidth / 2) - (windowBase.clientWidth / 2)
  )
  const y = Math.round(
    (document.body.clientHeight / 2) - (windowBase.clientHeight / 2)
  )

  //windowBase.style.transform = `translate(${x}px, ${y}px)`
  windowBase.style.left = `${x}px`
  windowBase.style.top = `${y}px`

  // Get the image for displaying in the title bar
  const image = document.querySelector(`.desktop_icon[name='${name}'] img`)?.getAttribute('data-src') || './image/desktop/win_xp_default.png'
  const newImg = document.createElement('img')
  newImg.src = image

  // There now exists an element with the id of "window_[name]", so we can get it and insert our stuff into the "contents" area
  const windowContents = document.querySelector(`#window_${name} .window_contents`)
  const windowTitle = document.querySelector(`#window_${name} .window_title_contents`)
  windowContents.innerHTML = html
  windowTitle.innerHTML = newImg.outerHTML + title

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