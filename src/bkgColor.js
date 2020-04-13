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

const selectHeadBody = document.querySelector('.colorSampler');
const headColorSelector = document.getElementsByClassName ('headColorOptions')[0];
const bodyColorSelector = document.getElementsByClassName ('bodyColorOptions')[0];

selectHeadBody.addEventListener('click', chooseHeadBody, false);

function chooseHeadBody(e) {
    let notParent = e.target !== e.currentTarget;
    let headBtn = selectHeadBody.children[0];
    let bodyBtn = selectHeadBody.children[1];
    if (notParent && e.target === headBtn) {
        /* alert('hello I am the header button'); */
        changeHeadColor();
        
    } else if (notParent && e.target === bodyBtn){
        /* alert('hello I am the BODY button'); */
        changeBodyColor()
    }
    e.stopPropagation();
}


/* console.log(selectHeadBody.children[0]);
console.log(selectHeadBody.children[1]);
console.log(e.target); */

/* const headColor = document.getElementsByClassName ('headerColor');
headColor[0].addEventListener('click', changeHeadColor);


const or = document.getElementsByClassName ('headColorOptions')[0];
*/
function changeHeadColor() {
     /* alert('Change header colour button is working');  */
     if(headColorSelector.style.display === "none"){
        headColorSelector.style.display = "flex";
        bodyColorSelector.style.display = "none";
    }/* else {
        headColorSelector.style.display = "none";
    }  */
}
 
function changeBodyColor() {
    /* alert('Change header colour button is working');  */
   if(bodyColorSelector.style.display === "none"){
      bodyColorSelector.style.display = "flex";
      headColorSelector.style.display = "none";
  } else{
      bodyColorSelector.style.display = "none";
  }
}




/* const defaultColorHead = document.getElementsByClassName ('headerColor');
defaultColorHead.addEventListener('click', colorHeadDefault);


const getNavigation = document.getElementsByClassName ('navigation')[0];

function colorHeadDefault() {
    if (defaultColorHead.children[0]){
    getNavigation.style.background = 'linear-gradient(to right, #C471ED, #fff)'
    } else if (defaultColorHead.children[1]){
        alert('gradColor button 2 working');
        getNavigation.style.background = 'linear-gradient(to right, #C471ED, #000000)'
        }
}
 */





/* const bodyColor = document.getElementsByClassName ('bodyColor')[0];
bodyColor.addEventListener('click', changeBodyColor);

const bodyColorSelector = document.getElementsByClassName ('bodyColorOptions')[0];

function changeBodyColor() {
     alert('Change header colour button is working'); 
    if(bodyColorSelector.style.display === "none"){
       bodyColorSelector.style.display = "flex";
       headColorSelector.style.display = "none";
   }else{
       bodyColorSelector.style.display = "none";
   }
}


console.log(defaultColorHead[2]) */