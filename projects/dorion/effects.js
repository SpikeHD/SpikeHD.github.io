const TITLE = "Welcome to Dorion"
let didScroll = false

/**
 * Function to wait
 */
async function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Play the little typing animation in the splash screen
 */
async function typingAnim() {
  const title = document.querySelector('#title')

  if (!title) return

  for (const letter of TITLE.split('')) {
    title.innerHTML = title.innerHTML.replace('|', '') + letter + '|'

    await timeout(Math.floor(Math.random() * 100) + 60)
  }

  // Once the "typing" is done, blink the cursor
  let cur = true

  setInterval(() => {
    if (cur) {
      cur = false
      
      title.innerHTML = title.innerHTML.replace('|', '&nbsp;')
      return
    }
    
    cur = true
      
    title.innerHTML = title.innerHTML.replace(/&nbsp;$/, '|')
  }, 500)
}

/**
 * Yoinked from https://stackoverflow.com/a/7557433/13438741
 */
function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  );
}

document.addEventListener('scroll', (evt) => {
  if (didScroll) return

  ddScroll = true;

  setTimeout(() => {
    didScroll = false
  }, 500)

  document.querySelectorAll('.info_card').forEach((elm) => {
    if (isElementInViewport(elm)) {
      elm.classList.remove('hide')
    }
  })
})