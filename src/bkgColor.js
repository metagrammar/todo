// Get the button that opens the bkg-color modal page
const settingsOpen = document.getElementById ('colorSettings');

// Add the eventlistner to the button that opens the bkg-color modal page
settingsOpen.addEventListener('click', showBkgColorModal);

// Get the bkg-color modal html
const bkgColorModalPage = document.getElementsByClassName ("modal-container-bkg-color")[0];

// Show the bkg-color modal page
function showBkgColorModal(){
    bkgColorModalPage.style.display = "grid";
    event.preventDefault()
}

// Get the button that closes the bkg-color modal page
const settingsClose = document.getElementById ('closeBkgColorModal');

// Add the eventlistner to the button that opens the bkg-color modal page
settingsClose.addEventListener('click', hideBkgColorModal);

// Hide the bkg-color modal page
function hideBkgColorModal(){
    bkgColorModalPage.style.display = "none";
    event.preventDefault()
}

// Get the class="colorSampler" box that conatins diagram for the head and body options 
const selectHeadBody = document.querySelector('.colorSampler');

// Add eventlistener to check for click 
selectHeadBody.addEventListener('click', chooseHeadBody, false);

function chooseHeadBody(e) {
    let notParent = e.target !== e.currentTarget;
    let headBtn = selectHeadBody.children[0];
    let bodyBtn = selectHeadBody.children[1];
    if (notParent && e.target === headBtn) {
        changeHeadColor();
        
    } else if (notParent && e.target === bodyBtn){
        changeBodyColor()
    }
    e.stopPropagation();
}

// Get the headColorOptions box that conatins the colors for the HEADER 
const headColorSelector = document.getElementsByClassName ('headColorOptions')[0];

// Function to show / hide the haedColorOptions 
function changeHeadColor() {
     if(headColorSelector.style.display === "none"){
        headColorSelector.style.display = "flex";
        bodyColorSelector.style.display = "none";
    }/* else {
        headColorSelector.style.display = "none";
    }  */
}
 
/* Get the bodyColorOptions box that conatins the colors for the BODY */
const bodyColorSelector = document.getElementsByClassName ('bodyColorOptions')[0];

/* Function to show / hide the bodyColorOptions */
function changeBodyColor() {
   if(bodyColorSelector.style.display === "none"){
      bodyColorSelector.style.display = "flex";
      headColorSelector.style.display = "none";
  } else {
      bodyColorSelector.style.display = "none";
  }
}

const getNavigation = document.querySelector ('.navigation');
const getWidgetHead = document.querySelector ('.headerColor');
const getWidgetBody = document.querySelector ('.bodyColor');
const getBody = document.getElementsByTagName ('body')[0];


const colorBoxes = document.getElementsByClassName ('colorBox');
for (let colorBtns of colorBoxes) {
    colorBtns.addEventListener('click', switchColors);
}

/* console.log(getNavigation);
console.log(getBody);
console.log(colorBoxes[0]);
console.log(colorBoxes[1]);
console.log(colorBoxes[2]);
console.log(colorBoxes[3]);
console.log(colorBoxes[4]);
console.log(colorBoxes[5]);
console.log(getWidgetHead);
console.log(colorButtons); */

function switchColors(e) {
    if(e.currentTarget == colorBoxes[0]){
        getNavigation.style.background = 'linear-gradient(90deg, #C471ED 0%, #F64F59 100%)';
        getWidgetHead.style.background = 'linear-gradient(90deg, #C471ED 0%, #F64F59 100%)';

    } else if(e.currentTarget == colorBoxes[1]){
        getNavigation.style.background = 'linear-gradient(to right, #4286f4, #373B44)';
        getWidgetHead.style.background = 'linear-gradient(to right, #4286f4, #373B44)';

    } else if(e.currentTarget == colorBoxes[2]) {
        getNavigation.style.background = 'linear-gradient(to right, #38ef7d, #11998e)';
        getWidgetHead.style.background = 'linear-gradient(to right, #38ef7d, #11998e)';
        
    } else if(e.currentTarget == colorBoxes[3]) {
        getBody.style.background = '#f5f5f5';
        getWidgetBody.style.cssText = 'color:rgba(0, 0, 0, 0.5); background: #f5f5f5;';

    } else if(e.currentTarget == colorBoxes[4]) {
        getBody.style.background = '#373B44';
        getWidgetBody.style.cssText = 'color:rgba(255, 255, 255, 0.5); background: #373B44;';
        
    } else if(e.currentTarget == colorBoxes[5]) {
        getBody.style.background = '#11998e';
        getWidgetBody.style.cssText = 'color:rgba(0, 0, 0, 0.5); background: #11998e;';
    }
 
}
 
function toggleActive(){
    if (classList.contains("activeColor")) {
        cclassList.remove("activeColor");
    } else {classList.add("activeColor");
    }
}
