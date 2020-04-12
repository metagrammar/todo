// Get the button that opens the modal
const addTodoBtn = document.getElementById ('newTodo');

// Get the modal
const modalPage = document.getElementsByClassName ("modal-container");

// Get the <span> element that closes the modal


console.log(modalPage);


addTodoBtn.addEventListener('click', showModal);

function showModal(){
    alert('Modal page eventhandler works!');
    modalPage[0].style.display = "grid";
    event.preventDefault()
}