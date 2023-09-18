let timeDisplay = document.getElementById('time-display');

window.electronAPI.onUpdateTime((event, value) => {
    timeDisplay.textContent = value;
})
