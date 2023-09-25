const mainMenuContainer = document.getElementById("main-menu");

const style = `<link rel="stylesheet" type="text/css" href="displays/timeDisplay.css"></link>`;

const htmlTemplate = `
<div id="menu-drawer">
  <div id="close-button" class="menu-option btn"> Close App </div>
</div>
<button id="open-close" class="btn">opt</button>
`;

mainMenuContainer.innerHTML = htmlTemplate;

let menuIsOpen = false;
const openCloseButton = document.getElementById('open-close');

const menuDrawer = document.getElementById('menu-drawer');

openCloseButton.addEventListener('click', () => {
  if(menuIsOpen){
    menuIsOpen = false;
    menuDrawer.style.visibility = "hidden";
  }else{
    menuIsOpen = true;
    menuDrawer.style.visibility = "visible";
  }
})

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', () => {
    window.electronAPI.closeButtonPressed();
})