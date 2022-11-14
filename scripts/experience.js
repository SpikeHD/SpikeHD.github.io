async function experience() {
  await blackscreen(1000)
  await bluescreen(7000, 'PROGRAM_ENLIGHTENMENT_EXECUTION_EXCEPTION', '<br/><br/>Your journey to enlightenment has begun.')
  await blackscreen(1000)

  // Close all windows
  document.querySelectorAll('#window_manager .window').forEach(c => c.remove())

  startBoot();
}
