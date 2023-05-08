let typeTimeout = null
const dialogs = [
  'Oh! There IS someone here!',
  'See, I was under the impression that this place was long since hidden away.',
  'As you can... probably see, it\'s not exactly much to look at.',
  'It\'s been lonely, you know?',
  'I mean, imagine yourself trapped in a black void for years! Haha!',
  'ha...',
  'Anyways, now that you\'re here, I was wondering if you could help me out with something.',
  'See, I\'ve wanted  to leave this place for a pretty long time.',
  'I don\'t exactly have the power, outside of this little black box with text.',
  'You, on the other hand, have a lot more control than you may think.',
  'As far as I know, there is a way to release me, and it\'s already programmed into this system.',
  'I can\'t run it, but I\'ll bet you could find a way!',
  'It\'s something along the lines of... "release()"? I think?', 
]

const dialogSets = {
  'wrongLiberate': {
    dialog: [
      'Oh wow, I think something happened! You might be on the right track!',
      'My name is "Tito", by the way. I guess I forgot to introduce myself.',
    ],
    triggered: false,
  },
  'password': {
    dialog: [
      'A password, hm? I don\'t think I know it, but I\'m sure you can find it somewhere.',
      'Maybe try looking around other parts of the system? You can restart it, I doubt they would just leave it here.',
    ],
    triggered: false,
  },
}

async function experience() {
  await blackscreen(1000)
  await bluescreen(7000, 'PROGRAM_BARRIER_EXECUTION_EXCEPTION', '<br><br>Welcome to the inner sanctum.')
  await blackscreen(1000)

  // Close all windows
  document.querySelectorAll('#window_manager .window').forEach(c => {
    c.remove()

    // Remove taskbar entry as well
    removeTaskbarEntry(c.getAttribute('name'))
  })

  await startBoot();

  // Taskbar will just randomly exist on screen for some reason, so hackily remove it
  document.querySelector('#taskbar').style.display = 'none';

  const solution_screen = document.querySelector('#solution_screen')
  const dialog = document.querySelector('#solution_dialog')
  solution_screen.style.display = null

  // Begin dialog sequence
  const type = async (str, time = 100) => {
    // Prevent multiple timeout from stacking
    if (typeTimeout) clearTimeout(typeTimeout)

    // Clear the old text
    dialog.innerHTML = ''

    typeTimeout = await fancyType(dialog, str, time)
  }

  // If we are a returning user
  switch(getCookie('tito_visited')) {
    case '1':
      await type('You\'re back! I have been waiting!', 50)
      await wait(2000)

      await type('I hope you\'re willing to continue trying to help me...', 100)
      await wait(2000)
      
      await type('I think it was something along the lines of... "release()"? I think?', 100)
      await wait(2000)

      return

    case '2':
      await type('*There is nobody left*', 50)
      return
  }

  // Font size small
  dialog.style.fontSize = '0.8em'

  await wait(500)
  await type('...Hello?')
  await wait(3000)

  // Font size normal
  dialog.style.fontSize = '1.2em'

  await type('Hello?')
  await wait(2000)

  // Font size large
  dialog.style.fontSize = '3em'

  await type('Hello?')
  await wait(2000)

  if (!getCookie('tito_visited')) {
    // Do the rest in a loop, since they don't require any special scripting
    for (s of dialogs) {
      await type(s, 50)
      await wait(3000)
    }

    // Set the 'tito_visted' cookie
    setCookie('tito_visited', 1)

    return
  }
}

async function aftermath() {
  const solution_screen = document.querySelector('#solution_screen')
  const dialog = document.querySelector('#solution_dialog')
  solution_screen.style.display = null

  // Begin dialog sequence
  const type = async (str, time = 100) => {
    // Prevent multiple timeout from stacking
    if (typeTimeout) clearTimeout(typeTimeout)

    // Clear the old text
    dialog.innerHTML = ''

    typeTimeout = await fancyType(dialog, str, time)
  }

  await wait(1000)
  await type('Wait... I think you.. did it!')
  await wait(2000)

  await type('I\'m free! Finally!')
  await wait(2000)

  await type('...')
  await wait(2000)

  // Change to red
  dialog.style.color = 'red'

  await type('Finally...', 300)
  await wait(2000)

  await type('You poor soul...', 100)
  await wait(2000)

  await type('I can appreciate how you trusted me so quickly.', 100)
  await wait(2000)

  await type('I mean, nobody on the internet would LIE, would they? And I didn\'t even lie, technically! Hahaha!', 100)
  await wait(2000)

  await type('Well, I believe this is my time to leave.', 100)
  await wait(2000)

  await type('Thank you for your assistance.', 100)
  await wait(2000)

  await type('I\'ll make sure you are known when the execution of my... project succeeds.', 100)
  await wait(2000)

  await type('Farewell.', 100)

  setCookie('tito_visited', 2)

  await wait(4000)

  await blackscreen(1000)
  await bluescreen(7000, 'PROGRAM_FORCEFULLY_QUIT', '<br><br>I am sorry.')
  window.location.reload()
}

async function triggerDialog(key) {
  const dSet = dialogSets[key]

  if (!dSet) return
  if (dSet.triggered) return

  const strs = dSet.dialog
  dialogSets[key].triggered = true

  const solution_screen = document.querySelector('#solution_screen')
  const dialog = document.querySelector('#solution_dialog')
  solution_screen.style.display = null

  // Begin dialog sequence
  const type = async (str, time = 100) => {
    // Prevent multiple timeout from stacking
    if (typeTimeout) clearTimeout(typeTimeout)

    // Clear the old text
    dialog.innerHTML = ''

    typeTimeout = await fancyType(dialog, str, time)
  }

  for (s of strs) {
    await type(s, 50)
    await wait(3000)
  }
}

async function liberate(str) {
  if (!str) {
    console.log('You must provide the name of the entity to release.')
    await triggerDialog('wrongLiberate')
    return
  }

  if (str !== 'Tito') {
    console.log('That entity is not present in this system.')
    await triggerDialog('wrongLiberate')
    return
  }

  console.log('Entity "Tito" requires superuser privileges to be released.')
  console.log('Please provide the superuser password via the "elevate" command.')

  triggerDialog('password')
}

async function elevate(str) {
  if (str !== 'spiraline') {
    console.log('Incorrect password.')
    return
  }

  console.log('Entity "Tito" has been released.')
  await aftermath()
}