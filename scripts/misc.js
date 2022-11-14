const bsodTemplate = `
A problem has been detected Windows has been shut down to prevent damage to your computer.<br/><br/>

$BSOD_MESSAGE<br/><br/>

Your computer will restart in a moment. If this screen appears again, follow these steps:<br/><br/>

Check to make sure any new hardware or software is properly installed.
If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.<br/><br/>

If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing.
If you need to use safe more to disable or remove components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.<br/><br/>

Technical Information:<br/><br/>

••• STOP: 0x0000005A (0x00000001, 0x00000000, 0x00000000)<br/><br/>

Collecting data for crash dump . . .<br/>
Initializing disk for crash dump . . .<br/>
Beginning dump for physical memory.<br/>
Dumping physical memory to disk: 100<br/>
Physical memory dump complete.<br/><br/>

<b>$BSOD_FOOTER</b>`
const clock = document.querySelector('#taskbar_time')

setInterval(getTime, 30_000)

function getTime() {
  const d = new Date()
  let hr = d.getHours()
  let min = d.getMinutes()

  min = min < 10 ? '0' + min : min

  var postfix = "am"

  if(hr > 12) {
    hr -= 12;
    postfix = "pm"
  }
  
  clock.innerHTML = `${hr}:${min} ${postfix}`
}

// Run once to display time for the first time
getTime()

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function rand(min, max) {
  return Math.floor(Math.random() * (max-min)) + min
}

async function bluescreen(ms, message, footer = 'Contact your system admin or technical support group for further assistance.') {
  const bsod = document.querySelector('#bluescreen')
  bsod.style.display = 'block'

  bsod.innerHTML = bsodTemplate.replace('$BSOD_MESSAGE', message).replace('$BSOD_FOOTER', footer)

  await wait(ms)

  bsod.innerHTML = ''
  bsod.style.display = 'none'
}

async function blackscreen(ms) {
  const black = document.querySelector('#blackscreen')
  black.style.display = 'block'

  await wait(ms)

  black.style.display = 'none'
}