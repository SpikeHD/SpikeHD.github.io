/**
 * Make an element draggable
 * 
 * @param {HTMLDivElement} element 
 */
function assignTitleDraggable(element) {
  element.addEventListener('mousedown', mousedown)
  element.addEventListener('touchstart', mousedown)
}

function mousedown(evt) {
  // Handle touches and mouse movement
  const clientX = evt.touches ? evt.touches[evt.touches.length-1].clientX : evt.clientX  
  const clientY = evt.touches ? evt.touches[evt.touches.length-1].clientY : evt.clientY

  const tgtX = evt.target.getBoundingClientRect().left
  const tgtY = evt.target.getBoundingClientRect().top
  const mouseX = clientX
  const mouseY = clientY
  const dragOffsetX = mouseX - tgtX
  const dragOffsetY = mouseY - tgtY

  // Set all window zIndexes to less than 999
  document.querySelectorAll('.window').forEach(e => {
    e.style.zIndex = 998
  })

  // Get the window ancestor
  const windowElm = evt.target.closest('.window')

  // Set this elements z index to 999
  windowElm.style.zIndex = 999

  const drag = (evt) => {
    // Handle touches AND  mouse movement
    const clientX = evt.touches ? evt.touches[evt.touches.length-1].clientX : evt.clientX  
    const clientY = evt.touches ? evt.touches[evt.touches.length-1].clientY : evt.clientY
    const newX = clientX - dragOffsetX
    const newY = clientY - dragOffsetY

    //window.style.transform = `translate(${newX}px, ${newY}px)`
    windowElm.style.left = `${newX}px`
    windowElm.style.top = `${newY}px`
  }

  const mouseup = (evt) => {
    // Remove movement event since we have lifted up
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('touchmove', drag)

    document.removeEventListener('mouseup', mouseup)
    document.removeEventListener('touchend', mouseup)
  }

  // Mousemove is added to the document in case the lement can't catch up and the mouse leaves the elemnts zone
  document.addEventListener('mousemove', drag)
  document.addEventListener('touchmove', drag)

  document.addEventListener('mouseup', mouseup)
  document.addEventListener('touchend', mouseup)
}