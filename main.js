            let todos;
            const saveTodo = JSON.parse(localStorage.getItem('todos'));
            if(Array.isArray(saveTodo))
            todos = saveTodo;
            else 
                todos = [
                    {
                    title:'web dev',
                    dueDate: '2022-22-2',
                    id: 'id1'},

                    {
                    title: 'eat',
                    dueDate: '2022-3-2',
                    id: 'id2'},

                    { 
                    title: 'sleep',
                    dueDate: '2022-3-2',
                    id: 'id3'}
                ]
            render();
            
            //Create Todo
            function createTodo(textTitle, dateTitle) {
            const id = new Date().getTime();
                todos.push({title: textTitle, dueDate: dateTitle, id: id});
                textTitle.value = '';
                dateTitle.value = '';
                render();
                saveTodos();

            }
            //Remove Todo
            function removeTodo(idTodelete) {
                todos = todos.filter(todo => todo.id != idTodelete)

                saveTodos();
            }

            function todoToggle(todoId, checked) {
                todos.forEach(todo => {
                    if(todo.id === todoId)
                        todo.isDone = checked;
                })
            }

            //save todos to localstorage;
            //get that item;
            //use it in the todos array;
            function saveTodos() {
                localStorage.setItem('todos', JSON.stringify(todos));
            }

            function settingUp(todoId) {
                    todos.forEach(todo => {
                    if(todoId == todo.id){
                        todo.isEditing = true;
                    }
                    
                })

                saveTodos();      
             }
             function updateTodo(newText, newDate, todoId) {
             todos.forEach(todo => {
                    if(todoId == todo.id) {
                        todo.title = newText;
                        todo.dueDate = newDate;
                        todo.isEditing = false;
                    }
                })
                saveTodos();
            }

            //Controller
            function addTodo() {
                const textBox = document.getElementById('inputText');
                const dueDate = document.getElementById('dueDate');
                const textTitle = textBox.value;
                const dateTitle = dueDate.value;

                createTodo(textTitle, dateTitle);
            }

            function checkTodo(idTocheck, checkbox) {
                return () => {
                    todoToggle(idTocheck.id, checkbox.checked);
                    saveTodos();
                }
            }

            function onEdit(idToEdit) {
                return () => {
                    //setting up the todo.isEditing to true;
                    settingUp(idToEdit.id);
                    render();
                }
            }

            function updateButton(idToUpdate) {
                return () => {
                    const textBox = document.getElementById('textBoxId' + idToUpdate.id);
                    const newText = textBox.value;
    
                    const datePicker = document.getElementById('datePickerId' + idToUpdate.id);
                    const newDate = datePicker.value;
                    
                    updateTodo(newText, newDate, idToUpdate.id);
                    render();
                }
            }


            function onDelete(idToDelete) {
                return () => {
                    removeTodo(idToDelete.id);
                    render();
                    saveTodos();
                }
            }

            //View
            function render() {
                document.getElementById('todo-list').innerHTML = '';  //set todo-list empty;

                todos.forEach( todo => { //iterate
                    const div = document.createElement('div'); 
                    const listItem = document.getElementById('todo-list');
                    
                    if(todo.isEditing === true) {
                        const textBox = document.createElement('input');
                        textBox.type = 'textBox';
                        textBox.id = 'textBoxId' + todo.id;
                        console.log(textBox.id);
                        div.appendChild(textBox);
                        const datePicker = document.createElement('input');
                        datePicker.type = 'date';
                        datePicker.id = 'datePickerId' + todo.id;
                        div.appendChild(datePicker);
                        const updateBtn = document.createElement('button');
                        updateBtn.dataset.todoId = todo.id;
                        updateBtn.onclick = updateButton(todo);
                        updateBtn.innerText ='Update';
                        div.appendChild(updateBtn);
                        listItem.appendChild(div);
                        
                        
                        
                    }
                    else {                    
                        div.innerText = todo.title +" "+ todo.dueDate;
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.onchange = checkTodo(todo, checkbox); //clicked
                        checkbox.dataset.todoId = todo.id; 
                        if(todo.isDone === true) { //undefined if not clicked the checkbox
                            checkbox.checked = true;
                            
                        }
                        else 
                            checkbox.checked = false;
                        div.prepend(checkbox);
                    
                        const editBtn = document.createElement('button');
                        editBtn.innerText = 'Edit';
                        editBtn.style = 'margin-left: 12px';
                        editBtn.onclick = onEdit(todo);
                        editBtn.dataset.todoId = todo.id;
                        div.appendChild(editBtn);
                        const deleteBtn = document.createElement('button');
                        deleteBtn.innerText = 'delete';
                        deleteBtn.style = 'margin-left: 12px';
                        deleteBtn.onclick = onDelete(todo); 
                        deleteBtn.id = todo.id;  
                        div.appendChild(deleteBtn);
                        const listItem = document.getElementById('todo-list');
                        listItem.appendChild(div);
                        }
                    });
            }