/**
 * Create a window based on name, using HTML in ./windows (which contains the inner HTML of windows to be displayed)
 */
async function createWindow(name, path = '', dimensions = null) {
  const title = getNiceName(name)
  const windowManager = document.querySelector('#window_manager')
  const windowBaseHTML = await fetch(`windows/window_base.html`)
  const windowHTML = await fetch(path || `windows/${name}.html`)
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

  // If dimensions are specified, use those instead
  if (dimensions) {
    windowBase.style.width = `${dimensions.width}`
    windowBase.style.height = `${dimensions.height}`
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

  // Create taskbar entry
  createTaskbarEntry(name, image)

  // Assign close event to clicking the close button
  const closeBtn = document.querySelector(`#window_${name} .window_actions img`)
  closeBtn.addEventListener('click', () => {
    const window = document.querySelector(`#window_${name}`)
    window.remove()
    
    removeTaskbarEntry(name)
  })
}

/**
 * Similar to createWindow, but a more locked-down small dialog
 * 
 * @param {String} name 
 * @param {String} contents 
 */
async function createDialog(name, heading, contents) {
  const windowManager = document.querySelector('#window_manager')
  const windowBaseHTML = await fetch(`windows/window_base.html`)
  const windowHTML = await fetch(`windows/dialog.html`)
  let html = await windowHTML?.text()

  // Name may not exist or something
  if (!html) return

  const id = 'window_' + name + Math.floor(Math.random() * 9999999)
  const windowBase = document.createElement('div')
  windowBase.className = 'window'
  windowBase.id = id

  windowBase.style.zIndex = 999
  windowBase.style.width = '500px'
  windowBase.style.height = '200px'

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
  const image = './image/desktop/win_xp_default.png'
  const newImg = document.createElement('img')
  newImg.src = image

  // There now exists an element with the id of "window_[name]", so we can get it and insert our stuff into the "contents" area
  const windowContents = document.querySelector(`#${id} .window_contents`)
  const windowTitle = document.querySelector(`#${id} .window_title_contents`)
  windowContents.innerHTML = html
  windowTitle.innerHTML = newImg.outerHTML + name

  // Make title draggable
  assignTitleDraggable(document.querySelector(`#${id} .window_title`))

  // Set inner heading and content
  document.querySelector(`#${id} .diag-header`).innerHTML = heading
  document.querySelector(`#${id} .diag-contents`).innerHTML = contents

  // Create taskbar entry
  createTaskbarEntry(name, './image/desktop/win_xp_default.png')

  // Assign close event to clicking the close button
  const closeBtn = document.querySelector(`#${id} .window_actions img`)
  closeBtn.addEventListener('click', () => {
    const window = document.querySelector(`#${id}`)
    window.remove()

    removeTaskbarEntry(name)
  })

  // Assign close event to Ok button as well
  const okBtn = document.querySelector(`#${id} .diag-ok`)
  okBtn.addEventListener('click', () => {
    const window = document.querySelector(`#${id}`)
    window.remove()

    removeTaskbarEntry(name)
  })
}

function createTaskbarEntry(name, img) {
  const entry = document.createElement('div')
  const title = document.createElement('span')
  const icon = document.createElement('img')
  entry.className = 'taskbar_icon'
  entry.setAttribute('name', name)

  title.innerHTML = getNiceName(name)
  icon.src = img

  entry.appendChild(icon)
  entry.appendChild(title)

  // When you click the taskbar entry, bring the window to the front
  entry.addEventListener('click', () => {
    const window = document.querySelector(`#window_${name}`)

    // Ensure all other windows are behind
    document.querySelectorAll('.window').forEach(e => {
      e.style.zIndex = 998
    })

    // Bring this one to the front
    window.style.zIndex = 999
  })

  document.querySelector('#taskbar_icons').appendChild(entry)
}

function removeTaskbarEntry(name) {
  const entry = document.querySelector(`.taskbar_icon[name='${name}']`)
  entry.remove()
}

function getNiceName(name) {
  let noUnder = name.replace(/_/g, ' ')
  return noUnder[0].toUpperCase() + noUnder.substring(1)
}