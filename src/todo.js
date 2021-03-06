const todoWrapper = document.querySelector('.content-wrapper');
const allCheckBoxContainer =
    todoWrapper.getElementsByTagName("input");
const addTodoButton = document.querySelector('.add-todo');


const todoItems = document.getElementsByClassName('todo-box');

const seeTodoDate = document.querySelector('dateOnOff');
const seeTodoTime = document.querySelector('timeOnOff');
const todoItem = document.querySelector('.todo-box');

const todoAllSpans = todoWrapper.querySelectorAll('span');
const toggleWrapper = document.querySelector('.checkbox-container');
const todoText = document.getElementsByClassName('todo-text');
console.log('todotext');
const todoDeadline = document.querySelector('.due_date_ticker').children;
const todoDate = todoDeadline[0];
const todoTime = todoDeadline[1];
const deleteBtn = document.querySelector('.todo-delete');
const saveBtn = document.querySelector('.todo-save');

//Select elements in modal
const modal = document.querySelector('.modal-container');
const modalTextarea = modal.querySelector('textarea');
console.log(modalTextarea);
const modalDate = modal.querySelector('#todoDate');
const modalTime = modal.querySelector('#todoTime');
console.log(modalDate);
console.log(modalTime);
const modalBox = document.getElementById('to-update');

console.log('modalBox on top');
console.log(modalBox);

let todoDataBase = [];
// let uuid = 0;
let uuid = Math.random();

const fetchedTodos = localStorage.getItem('todo_items');


console.log('shows the input with the time and maybe the data');
console.log(todoDataBase);


// CSS class names to mutate
const doneTodo = 'toggle';
const openTodo = '';
const strikeTodo = 'todo-done';

// Tony
const dateSet = '';
const dateHidden = 'todo-hide';

const timeSet = '';
const timeHidden = 'todo-hide';

/*
* The createTodoItem creates an todoItem which is called when user clicks on save button in modal
* taskState: Boolean
*   - true: done
*   - false: task
*
* */


const createTodoItem = (id, todoTaskTitle, isDone, doUntilDate, doUntilTime) => {


    const isTodoDone = isDone ? doneTodo : openTodo;
    const isStrike = isDone ? strikeTodo : openTodo;
    // Tony
    const isDateSet = doUntilDate ? dateSet : dateHidden;
    const isTimeSet = doUntilTime ? timeSet : timeHidden;
    // const isDoneSetGrey = isDone ? grey : openTodo;

    // todo: Dummy Date
    const dateConfig = {weekday: 'long', month: 'long', day: 'numeric'};
    const doneDeadlineDate = new Date(doUntilDate).toLocaleDateString('en-US', dateConfig);
    // const doneDeadlineTime = todoTime.value;


    //doUntilDate.toLocaleDateString('en-US', dateConfig);

    const todoItem = `
                    <div class="todo-box ${isStrike}" id="${id}">
                        <div class="todo-time">
                            <span class="material-icons">alarm</span>
                            <div class="date-time-cont">
                                <span class="dateOnOff ${isDateSet}">${doneDeadlineDate} - </span>
                                <span class="timeOnOff ${isTimeSet}">${doUntilTime}</span>
                            </div>
                            <span class="material-icons trash-icon" id="${id}">delete</span>
                        </div>
                        <label class="checkbox-container">
                            <div class="todo-text" id="${id}">
                                ${todoTaskTitle}
                            </div> 
                                <input type="checkbox" id="${id}">
                                <span class="${isTodoDone} checkmark" id="${id}"></span>
                        </label>
                    </div>
    `;

    todoWrapper.insertAdjacentHTML('beforeend', todoItem);
    // todoWrapper.insertAdjacentHTML('beforeend', todoItem);
    // todoDataBase.push(todoItem)

    localStorage.setItem('todo_items', JSON.stringify(todoDataBase));
};

const loadState = (db) => {
    // db.map(todoItem =>
    //     createTodoItem(todoItem.uuid, todoItem.task, todoItem.isDone, todoItem.doUntilDate, todoItem.doUntilTime));
    db.forEach(item => createTodoItem(item.id, item.task, item.isDone, item.doUntilDate, item.doUntilTime))
};

if (fetchedTodos) {
    todoDataBase = JSON.parse(fetchedTodos);
    // uuid = todoDataBase.length;
    loadState(todoDataBase);
} else {
    todoDataBase = [];
    uuid = Math.random();
    // uuid = 0;
}

const saveTodoItem = (id) => {


    // // Updating todoitem
    if (id) {
        const todoContent = todoDataBase.filter(item => id === item.id.toString());


        modalTextarea.textContent = todoContent[0].task;
        modalDate.setAttribute('value', todoContent[0].doUntilDate);
        modalTime.setAttribute('value', todoContent[0].doUntilTime.toString()); //todo


        const todoTextContent = modalTextarea.value;
        const todoUntilDate = modalDate.value;
        const todoUntilTime = modalTime.value;


        // Find index of the id that gets update
        const indexToUpdate = todoDataBase.findIndex(item => item.id.toString() === id);


        todoDataBase[indexToUpdate].task = todoTextContent;
        todoDataBase[indexToUpdate].doUntilDate = todoUntilDate;
        todoDataBase[indexToUpdate].doUntilTime = todoUntilTime;

        localStorage.setItem('todo_items', JSON.stringify(todoDataBase));

    } else { // Save new todoitem
        const todoTextContent = modalTextarea.value;
        const todoUntilDate = todoDate.value;
        const todoUntilTime = todoTime.value;

        if (!todoTextContent) {
            alert('you failed');
            event.preventDefault();
            return;
        }


        createTodoItem(uuid, todoTextContent, false, todoUntilDate, todoUntilTime);

        todoDataBase.push({
            id: uuid,
            task: todoTextContent,
            isDone: false,
            doUntilDate: todoUntilDate,
            doUntilTime: todoUntilTime
        });

        localStorage.setItem('todo_items', JSON.stringify(todoDataBase));

        // uuid++;

        todoText.value = '';
        todoDate.value = '';
        todoTime.value = '';
        hideModal();

    }
};


const toggleTodoTask = (todoItem) => {
    const todoItemWrapper = todoItem.parentNode.parentNode;
    todoItemWrapper.classList.toggle('todo-done');
    todoItem.classList.toggle('toggle');
    todoDataBase[todoItem.id].isDone = !todoDataBase[todoItem.id].isDone;
};


[...allCheckBoxContainer].forEach(inputTag => inputTag.nextSibling.nextSibling.addEventListener('click', event => {
    console.log('element that clicked');
    console.log(event.currentTarget);
    const circle = event.target;
    console.log('circle');
    console.log(circle);
    toggleTodoTask(circle);
    localStorage.setItem('todo_items', JSON.stringify(todoDataBase));
}));

const deleteTodo = (id) => {
    console.log(typeof id);
    const newDB = todoDataBase.filter(item => item.id.toString() !== id);
    todoDataBase = newDB;
    localStorage.setItem('todo_items', JSON.stringify(newDB));
    location.reload();
    return false;
};

const deleteIcons = document.querySelectorAll('.trash-icon');
[...deleteIcons].forEach(trashItem => trashItem.addEventListener('click', event => {
    const trash = event.currentTarget;
    deleteTodo(trash.id);
}));


// Edit todoitem functionality
const showFetchedModal = (id) => {
    showModal();
    saveBtn.classList = `todo todo-save ${id}`;

    const todoContent = todoDataBase.filter(item => id === item.id.toString());
    todoDataBase.map(tasks => console.log(tasks));
    modalTextarea.textContent = todoContent[0].task;
    modalDate.setAttribute('value', todoContent[0].doUntilDate); //todo
    modalTime.setAttribute('value', todoContent[0].doUntilTime.toString()); //todo
};


[...todoText].forEach(item => item.addEventListener('click', event => {
    showModal();
    console.log('clickes on for modal');
    console.log(event.target.id);
    showFetchedModal(event.target.id);

}));

saveBtn.addEventListener('click', event => {
    const idBtn = event.currentTarget.classList[2];
    console.log('idbtn');
    console.log(idBtn);
    saveTodoItem(idBtn);
});
