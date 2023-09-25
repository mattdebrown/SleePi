const sleepButton = document.getElementById('sleep-button');
sleepButton.addEventListener('click', () => {
    console.log('renderer.js sleep button')
    window.electronAPI.sleepButtonPressed();
})