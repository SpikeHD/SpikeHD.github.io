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