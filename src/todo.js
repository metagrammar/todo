const todoWrapper = document.querySelector('.content-wrapper');
const allCheckBoxContainer =
    todoWrapper.getElementsByTagName("input");
const addTodoButton = document.querySelector('.add-todo');

// Tony
const seeTodoDate = document.querySelector ('dateOnOff');
const seeTodoTime = document.querySelector ('timeOnOff');
const todoItem = document.querySelector('.todo-box');
const todoAllSpans = todoWrapper.querySelectorAll('span');
const todoCheckSpan = todoAllSpans[1];
const toggleWrapper = document.querySelector('.checkbox-container');
const todoText = document.querySelector('textarea');
const todoDeadline = document.querySelector('.due_date_ticker').children;
const todoDate = todoDeadline[0];
const todoTime = todoDeadline[1];
const deleteBtn = document.querySelector('.todo-delete');
const saveBtn = document.querySelector('.todo-save');

let todoDataBase = [];
let uuid = 0;

const fetchedTodos = localStorage.getItem('todo_items');
    

console.log ('shows the input with the time and maybe the data');
console.log (todoDataBase);


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

    emptyTextbox(todoTaskTitle);

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
                            <div class="todo-text">
                                ${todoTaskTitle}
                            </div> 
                                <input type="checkbox" id="${id}">
                                <span class="${isTodoDone} checkmark" id="${id}"></span>
                        </label>
                    </div>
    `;

    todoWrapper.insertAdjacentHTML('afterbegin', todoItem);
    // todoWrapper.insertAdjacentHTML('beforeend', todoItem);
    // todoDataBase.push(todoItem)

    localStorage.setItem('todo_items', JSON.stringify(todoDataBase));
};

//Fails because i store html
const loadState = (db) => {
    // db.map(todoItem =>
    //     createTodoItem(todoItem.uuid, todoItem.task, todoItem.isDone, todoItem.doUntilDate, todoItem.doUntilTime));
    db.forEach(item => createTodoItem(item.id, item.task, item.isDone, item.doUntilDate, item.doUntilTime))
};

if (fetchedTodos) {
    todoDataBase = JSON.parse(fetchedTodos);
    uuid = todoDataBase.length;
    loadState(todoDataBase);
} else {
    todoDataBase = [];
    uuid = 0;
}

const saveTodoItem = () => {
    const todoTextContent = todoText.value;
    const todoUntilDate = todoDate.value;
    const todoUntilTime = todoTime.value;

    if(!todoTextContent){
        alert("Error, your ToDo is empty. Please fill in the box to continue.");
        hideModal();
        return
    }

    createTodoItem(uuid, todoTextContent, false, todoUntilDate, todoUntilTime);
    // console.log(`log from saveTodoItem:  ${uuid} ${todoTextContent} ${todoUntilDate} ${todoUntilTime}`);
    // console.log(`log string => date ${todoUntilDate} to ${new Date(todoUntilDate)}`);
  
    createTodoItem(uuid, todoTextContent, false, todoUntilDate, todoUntilTime);
    // console.log(`log from saveTodoItem:  ${uuid} ${todoTextContent} ${todoUntilDate} ${todoUntilTime}`);
    // console.log(`log string => date ${todoUntilDate} to ${new Date(todoUntilDate)}`);
    
    console.log('createTodoItem')

    todoDataBase.push({
        id: uuid,
        task: todoTextContent,
        isDone: false,
        doUntilDate: todoUntilDate,
        doUntilTime: todoUntilTime

    });

    localStorage.setItem('todo_items', JSON.stringify(todoDataBase));

    uuid++;

    todoText.value = '';
    todoDate.value = '';
    todoTime.value = '';

    // Hides the modal page after clicking on the save button
    hideModal();
    

};


const toggleTodoTask = (todoItem) => {

    const todoItemWrapper = todoItem.parentNode.parentNode;

    todoItemWrapper.classList.toggle('todo-done');
    todoItem.classList.toggle('toggle');

    // Tony    seeTodoDate.classList.toggle('todo-hide');

    todoDataBase[todoItem.id].isDone = !todoDataBase[todoItem.id].isDone;
};


[...allCheckBoxContainer].forEach(inputTag => inputTag.nextSibling.nextSibling.addEventListener('click', event => {
    console.log('element that clicked');
    console.log(event.currentTarget);
    // const circle = event.target;
    const circle = event.target;
    console.log('circle');
    console.log(circle);
    toggleTodoTask(circle);
    localStorage.setItem('todo_items', JSON.stringify(todoDataBase));
}));

const deleteTodo = (id) => {
    console.log(todoDataBase.map(item => item.id));
    const newDB = todoDataBase.filter(item => item.id != id);
    todoDataBase = newDB;
    // let db = todoDataBase.filter(item => item.id !== id);
    localStorage.setItem('todo_items', JSON.stringify(newDB));
    location.reload();
    return false;
};



const deleteIcons = document.querySelectorAll('.trash-icon');
console.log(deleteIcons);

[...deleteIcons].forEach(trashItem => trashItem.addEventListener('click', event => {
    const trash = event.currentTarget;
    console.log(trash);
    console.log(trash.id);
    deleteTodo(trash.id);
}));

saveBtn.addEventListener('click', saveTodoItem);
