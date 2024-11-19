const TITLE = "Welcome to Dorion"

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

  // Remove the cursor

  title.innerHTML = title.innerHTML.replace('|', '')
}