firstTime()

function fillSettings() {
  const bootCbx = document.querySelector('#bootSeq')
  bootCbx.checked = getCookie('bootSequence') === 'true'

  const iconCbx = document.querySelector('#iconLoad')
  iconCbx.checked = getCookie('iconLoad') === 'true'
}

function setCookie(name, val) {
  // This feels wrong but is right
  document.cookie = `${name}=${val}; expires=Fri, 31 Dec 9999 23:59:59 GMT`
}

// Nice cookie solution: https://stackoverflow.com/a/15724300
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function firstTime() {
  if (!getCookie('notnew')) {
    setCookie('notnew', true)
    setCookie('bootSequence', true)
    setCookie('iconLoad', true)
  }
}

function toggleIntro() {
  const cbx = document.querySelector('#bootSeq').checked
  setCookie('bootSequence', cbx)
}

function toggleIconLoading() {
  const cbx = document.querySelector('#iconLoad').checked
  setCookie('iconLoad', cbx)
}
