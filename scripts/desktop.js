document.addEventListener('DOMContentLoaded', async () => {
  // Create event listeners to each desktop icon
  const icons = document.querySelectorAll('.desktop_icon')

  for (const iconElm of icons) {
    const name = iconElm.getAttribute('name')
    
    iconElm.addEventListener('click', () => {
      createWindow(name)
    })
  }
})