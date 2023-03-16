async function experience() {
  await blackscreen(1000)
  await bluescreen(7000, 'PROGRAM_ENLIGHTENMENT_EXECUTION_EXCEPTION', '<br><br>Your journey to enlightenment has begun.')
  await blackscreen(1000)

  // Close all windows
  document.querySelectorAll('#window_manager .window').forEach(c => c.remove())

  startBoot();

  // While we boot, do some removal
  document.querySelectorAll('.desktop_icon').forEach(e => e.remove())
  
  const desktop = document.querySelector('#desktop')
  const taskbar = document.querySelector('#taskbar')

  taskbar.style.display = 'none'

  desktop.style.backgroundImage = 'url(./image/bliss_alternative.png)'

  iconFill()

  let clicks = 0
  let clickMessages = {
    3: '3',
    5: '5',
    10: '10',
    15: '15',
    25: '25',
    40: '40'
  }

  desktop.addEventListener('click', () => {
    clicks++

    console.log(clicks)

    if (clickMessages[clicks]) createDialog('Information', '', clickMessages[clicks])
  })
}

function iconFill() {
  const desktopIcons = document.querySelector('#desktop_icons')

  // Set height to 100% since taskbar will be removed
  desktopIcons.style.height = '100vh'

  for (let i = 0; i < 200; i += 1) {
    const desktopIcon = document.createElement('div')
    const img = document.createElement('img')
    const span = document.createElement('span')

    desktopIcon.className = 'desktop_icon'
    desktopIcon.name = 'null'

    img.src = "image/desktop/win_xp_default.png"
    img.setAttribute('data-src', "image/desktop/win_xp_default.png")

    span.innerHTML = 'null'

    desktopIcon.appendChild(img)
    desktopIcon.appendChild(span)

    desktopIcons.appendChild(desktopIcon)
  }
}