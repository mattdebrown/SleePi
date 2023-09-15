// renderer.js
window.onload = () => {
  function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById('clock').textContent = `Current Time: ${time}`;
  }

  // Initial update
  updateClock();

  // Update the clock every second
  setInterval(updateClock, 1000);
};
