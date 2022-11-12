/**
 * Make an element draggable
 * 
 * @param {HTMLDivElement} element 
 */
function assignTitleDraggable(element) {
  element.addEventListener('mousedown', (evt) => {
    const tgtX = evt.target.getBoundingClientRect().left
    const tgtY = evt.target.getBoundingClientRect().top
    const mouseX = evt.clientX
    const mouseY = evt.clientY
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
      const newX = evt.clientX - dragOffsetX
      const newY = evt.clientY - dragOffsetY

      //window.style.transform = `translate(${newX}px, ${newY}px)`
      windowElm.style.left = `${newX}px`
      windowElm.style.top = `${newY}px`
    }
    const mouseup = (evt) => {
      // Remove movement event since we have lifted up
      document.removeEventListener('mousemove', drag)
      element.removeEventListener('mouseup', mouseup)
    }

    // Mousemove is added to the document in case the lement can't catch up and the mouse leaves the elemnts zone
    document.addEventListener('mousemove', drag)
    element.addEventListener('mouseup', mouseup)
  })


}

function doDrag(evt) {

}