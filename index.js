import inquirer from 'inquirer';
const todoList = {
    items: [],
};
function promptAddItem() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter new todo item:',
        },
    ])
        .then((answers) => {
        todoList.items.push({
            name: answers.name,
            completed: false,
        });
        showTodoList();
    });
}
function promptCompleteItem() {
    const choices = todoList.items.map((item, index) => ({
        name: item.name,
        value: index,
        checked: item.completed,
    }));
    inquirer
        .prompt([
        {
            type: 'checkbox',
            name: 'completed',
            message: 'Select items to mark as completed:',
            choices,
        },
    ])
        .then((answers) => {
        answers.completed.forEach((index) => {
            todoList.items[index].completed = true;
        });
        showTodoList();
    });
}
function showTodoList() {
    const items = todoList.items.map((item) => `${item.completed ? '[x]' : '[ ]'} ${item.name}`);
    console.log(items.join('\n'));
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Select an action:',
            choices: [
                { name: 'Add new item', value: 'add' },
                { name: 'Complete item', value: 'complete' },
                { name: 'Quit', value: 'quit' },
            ],
        },
    ])
        .then((answers) => {
        switch (answers.action) {
            case 'add':
                promptAddItem();
                break;
            case 'complete':
                promptCompleteItem();
                break;
            case 'quit':
                console.log('Goodbye!');
                process.exit();
        }
    });
}
console.log('Todo List:');
showTodoList();
