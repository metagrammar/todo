const todoWrapper = document.querySelector('.content-wrapper');
// console.log(todoWrapper);
const addTodoButton = document.querySelector('.add-todo');
// console.log(addTodoButton);
// const checkCircle = document.querySelector('span');
// console.log(checkCircle);

const todo = document.querySelector('.content-wrapper');
console.log(todo);

const todoText = document.querySelector('textarea');
// console.log(todoText);
const todoDeadline = document.querySelector('.due_date_ticker').children;
// console.log(todoDeadline);
const todoDate = todoDeadline[0];
const todoTime = todoDeadline[1];
// console.log(todoDate);
// console.log(todoTime);
const deleteBtn = document.querySelector('.todo-delete');
const saveBtn = document.querySelector('.todo-save');
const deadline = document.querySelector('.todo-time');
// console.log(deadline);


/*
* This array todoDataBase stores todoItems
* const todoDataBase = [{todoItem}. {todoItem}, {todoItem}, {todoItem}];
*
*
* */
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
*   - false: open task
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
                            <span class="${isTodoDone} checkmark"></span>
                        </label>
                    </div>
    `;

    todoWrapper.insertAdjacentHTML('beforeend', todoItem);
    // todoDataBase.push(todoItem)

};


/*
* The C in CRUD
* Some dummy data to show the functionality.
* */

const todoItem1 = createTodoItem(7, 'Haircut', true, new Date(), new Date());
// const todoItem2 = createTodoItem(8, 'Shopping', false, new Date(), new Date());
// const todoItem3 = createTodoItem(9, 'Study JS', false, new Date(), new Date());
// const todoItem4 = createTodoItem(5, 'Meeting', true, new Date(), new Date());
//
//
// // Storing data in naive DB
todoDataBase.push(todoItem1);
// todoDataBase.push(todoItem2);
// todoDataBase.push(todoItem3);
// todoDataBase.push(todoItem4);


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
    console.log(`log from saveTodoItem:  ${uuid} ${todoTextContent} ${todoUntilDate} ${todoUntilTime}`);
    console.log(`log string => date ${todoUntilDate} to ${new Date(todoUntilDate)}`);

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

    // if (todoItem.id === true) {
    console.log(todoItem.classList);
    // todoItem.classList.toggle(strikeTodo);
    console.log('asdf');
    const circleElement = todoItem.querySelectorAll('span');
    console.log(circleElement[1]);


    const todoState = todoDataBase[todoItem.id].isDone;
    if (todoState === false) {

        todoItem.classList.remove('todo-done');
        circleElement[1].classList.remove('toggle');
        todoDataBase[todoItem.id].isDone = true;
        // localStorage.setItem('todo_item', JSON.stringify(todoDataBase));
    } else {
        todoItem.classList.add('todo-done');
        circleElement[1].classList.add('toggle');
        todoDataBase[todoItem.id].isDone = false;
    }

    localStorage.setItem('todo_item', JSON.stringify(todoDataBase));

    console.log(todoState);


    // console.log('state2: ' + todoItem.id);

    // todoDataBase[todoItem.id].isDone ;
    // console.log(state);
    // const isDone = state.isDone;
    // const isTodoDone = state ? doneTodo : openTodo;
    // const isStrike = state ? strikeTodo : openTodo;

}


saveBtn.addEventListener('click', saveTodoItem);

todo.addEventListener('click', event => {
    // const circle = event.target;
    const circle = event.target.closest('div');
    console.log(circle);


    toggleTodoTask(circle);
    // localStorage.setItem('todo_item', JSON.stringify(todoDataBase));
});
