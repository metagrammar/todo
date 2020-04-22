// Get the button that opens the modal
const addTodoBtn = document.getElementById ('newTodo');

// Add the eventlistner to the button that opens the modal
addTodoBtn.addEventListener('click', showModal);

// Get the modal html
const modalPage = document.getElementsByClassName ("modal-container")[0];


// Get the <button> element that closes the modal
const closeModal = document.getElementsByClassName ('close-modal')[0];

// Add the eventlistner to the button that closes the modal
closeModal.addEventListener('click', hideModal);

console.log(closeModal);

function showModal(){
    /* alert('Modal page eventhandler works!'); */
    modalPage.style.display = "grid";
    event.preventDefault()
}

function hideModal(){
    /* alert('Close modal page eventhandler works!'); */
    modalPage.style.display = "none";
    event.preventDefault()

    //refreshing after an onclick
    location.reload();
    return false;
}
