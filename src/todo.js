/*
* This array todoDataBase stores todoItems
* const todoDataBase = [{todoItem}. {todoItem}, {todoItem}, {todoItem}];
*
*
* */
const todoDataBase = [];


/*
* The createTodoItem creates an todoItem
*
* */
const createTodoItem = (todoTaskTitle, doneDate, taskState, backGroundStyle) => {
    return {
        id: Math.random(),
        todoTaskTitle,
        doneDate,
        taskState,
        backGroundStyle
    }
};


/*
* The C in CRUD
* Some dummy data to show the functionality.
* */

const todoItem1 = createTodoItem('Haircut', null, false, '#f44336');
const todoItem2 = createTodoItem('Shopping', null, false, '#7b1fa2');
const todoItem3 = createTodoItem('Study JS', null, false, '#1565c0');
const todoItem4 = createTodoItem('Meeting', null, false, '#00695c');
const todoItem5 = createTodoItem('asdfsadf', null, false, '#76ff03');

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

