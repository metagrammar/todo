const todoWrapper = document.querySelector('.content-wrapper');
console.log(todoWrapper);
const addTodoButton = document.querySelector('.add-todo');
console.log(addTodoButton);
const checkCircle = document.getElementsByTagName('input');
console.log(checkCircle);


/*
* This array todoDataBase stores todoItems
* const todoDataBase = [{todoItem}. {todoItem}, {todoItem}, {todoItem}];
*
*
* */
const todoDataBase = [];
const uuid = 0;

const fetchTodos = localStorage.getItem('todo_items');

// CSS class names to mutate
const doneTodo = 'toggle';
const openTodo = '';
const strikeTodo = 'todo-done';

/*
* The createTodoItem creates an todoItem
* taskState: Boolean
*   - true: done
*   - false: open task
*
* */
const createTodoItem = (todoTaskTitle, taskState) => {

    const isTodoDone = taskState ? doneTodo : openTodo;
    const isStrike = taskState ? strikeTodo : openTodo;

    // todo: Dummy Date
    const today = new Date();
    const timeConfig = {weekday: 'long', month: 'long', day: 'numeric'};


    const todoItem = `
                    <div class="todo-box">
                        <div class="todo-time">
                            <span class="material-icons">alarm</span>
                            ${today.toLocaleDateString('de-DE', timeConfig)}
                        </div>
                        <label class="checkbox-container">
                            <div class="${isStrike} todo-text">
                                ${todoTaskTitle}
                            </div> 
                            <input type="checkbox">
                            <span class="${isTodoDone} checkmark" ></span>
                        </label>
                    </div>
    `;

    todoWrapper.insertAdjacentHTML('beforeend', todoItem);

};

/*
* The C in CRUD
* Some dummy data to show the functionality.
* */

const todoItem1 = createTodoItem('Haircut', true);
const todoItem2 = createTodoItem('Shopping', false);
const todoItem3 = createTodoItem('Study JS', false);
const todoItem4 = createTodoItem('Meeting', true);

// const todoItem1 = createTodoItem('Haircut', null, false, '#f44336');
// const todoItem2 = createTodoItem('Shopping', null, false, '#7b1fa2');
// const todoItem3 = createTodoItem('Study JS', null, false, '#1565c0');
// const todoItem4 = createTodoItem('Meeting', null, false, '#00695c');
// const todoItem5 = createTodoItem('asdfsadf', null, false, '#76ff03');

// Storing data in naive DB

todoDataBase.push(todoItem1);
todoDataBase.push(todoItem2);
todoDataBase.push(todoItem3);
todoDataBase.push(todoItem4);
todoDataBase.push(todoItem5);

console.log(todoDataBase.map(todoObject => todoObject));
console.log("printing just the task title -----------------------");
console.log(todoDataBase.map(todoObject => todoObject.todoTaskTitle));


todoDataBase.pop();

console.log('log after delete --------------');
console.log(todoDataBase.map(todoObject => todoObject.todoTaskTitle));


