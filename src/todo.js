const todoWrapper = document.querySelector('.content-wrapper');
const allCheckBoxContainer =
    todoWrapper.getElementsByTagName("input");
const addTodoButton = document.querySelector('.add-todo');
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


// CSS class names to mutate
const doneTodo = 'toggle';
const openTodo = '';
const strikeTodo = 'todo-done';

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
    // const isDoneSetGrey = isDone ? grey : openTodo;

    // todo: Dummy Date
    const dateConfig = {weekday: 'long', month: 'long', day: 'numeric'};
    const doneDeadlineDate = new Date(doUntilDate).toLocaleDateString('en-US', dateConfig);


    //doUntilDate.toLocaleDateString('en-US', dateConfig);

    const todoItem = `
                    <div class="todo-box ${isStrike}" id="${id}">
                        <div class="todo-time">
                            <span class="material-icons">alarm</span>
                                ${doneDeadlineDate}
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

    createTodoItem(uuid, todoTextContent, false, todoUntilDate, todoUntilTime);
    // console.log(`log from saveTodoItem:  ${uuid} ${todoTextContent} ${todoUntilDate} ${todoUntilTime}`);
    // console.log(`log string => date ${todoUntilDate} to ${new Date(todoUntilDate)}`);

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
    // const circle = event.target;
    const circle = event.target;
    console.log('circle');
    console.log(circle);
    toggleTodoTask(circle);
    localStorage.setItem('todo_items', JSON.stringify(todoDataBase));
}));

saveBtn.addEventListener('click', saveTodoItem);

