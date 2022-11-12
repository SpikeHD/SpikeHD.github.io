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
    
    // Get the window ancestor
    const windowElm = evt.target.closest('.window')
    const drag = (evt) => {
      const newX = evt.clientX - dragOffsetX
      const newY = evt.clientY - dragOffsetY

      //window.style.transform = `translate(${newX}px, ${newY}px)`
      windowElm.style.left = `${newX}px`
      windowElm.style.top = `${newY}px`
    }

    document.addEventListener('mousemove', drag)

    element.addEventListener('mouseup', (evt) => {
      // Get the window ancestor
      const windowElm = evt.target.closest('.window')
  
      // Remove movement event since we have lifted up
      document.removeEventListener('mousemove', drag)
    })
  })


}

function doDrag(evt) {

}