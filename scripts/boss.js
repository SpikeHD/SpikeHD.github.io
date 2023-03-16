/**
 * Fark souls easter egg.
 */
function beginBossBattle() {
  // Make darkenOverlay element visible
  const overlay = document.getElementById('darkenOverlay');
  overlay.style.display = 'block';

  // Transition doesn't happen when the element is hidden, and display technically takes time to change
  setTimeout(() => {
    overlay.classList.add('overlayShow');
  }, 75)

  // Temporarily set window manager to zindex 101
  const windowManager = document.getElementById('window_manager');
  windowManager.style.zIndex = 101;

  // Close all other windows
  document.querySelectorAll('.window').forEach(e => {
    e.remove();
  })

  createWindow('enemy', 'windows/fs/enemy.html');
  createWindow('player', 'windows/fs/player.html', { width: '300px', height: '400px' });
  // Create health bar window
  createWindow('health', 'windows/fs/health.html', { width: '50%', height: '120px' });

  // Again, we have to "wait" for the DOM update.
  setTimeout(() => {
    // Offset player window down and left from center, enemy window up and right
    const playerWindow = document.getElementById('window_player');
    const enemyWindow = document.getElementById('window_enemy');
    const healthWindow = document.getElementById('window_health');

    playerWindow.style.left = 'calc(50% - 500px)';
    playerWindow.style.top = 'calc(50% - 200px)';
    enemyWindow.style.left = 'calc(50% + 100px)';
    enemyWindow.style.top = 'calc(50% - 400px)';

    healthWindow.style.top = '';
    healthWindow.style.bottom = '75px';
  }, 75)
}