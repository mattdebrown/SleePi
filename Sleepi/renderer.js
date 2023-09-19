let timeDisplay = document.getElementById('time-display');

window.electronAPI.onUpdateTime((event, value) => {
    timeDisplay.textContent = value;
})

const closeButton = document.getElementById('close-button');

closeButton.addEventListener('click', () => {
    window.electronAPI.closeButtonPressed();
})