function fillSettings() {
  const bootCbx = document.querySelector('#bootSeq').value
  bootCbx.checked = getCookie('bootSequence')
}

function setCookie(name, val) {
  // This feels wrong but is right
  document.cookie = `${name}=${val}`
}

// Nice cookie solution: https://stackoverflow.com/a/15724300
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Handle settings via cookies
function toggleIntro() {
  const cbx = document.querySelector('#bootSeq').checked
  setCookie('bootSequence', cbx)
}