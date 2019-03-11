const BASE_URL = 'http://todo-with-vanliajs-and-nodejs-hyunseo.c9users.io/';

// id, text, checked;
var todos = [];

function getTodoRequestAsync(){
    let request = new XMLHttpRequest();
    
    sendHttpAsync('GET', BASE_URL+'todo', null, request, (item) => {
        let items = JSON.parse(request.response);
        
        console.log(items);
        
        for(let i=0 ; i < items.length; i++)
            addTodoItem(items[i]);    
    });
}

function createTodoRequestAsync(){
    let input = document.getElementById('form-input');
    let data = {};
    
    data['text'] = input.value;
    
    let request = new XMLHttpRequest();
    
    sendHttpAsync('POST', BASE_URL+'todo', data, request, () => {
        input.value = '';
        
        let item = JSON.parse(request.response);
        addTodoItem(item);
    });
}

function updateTodoRequestAsync(item){
    let data = {};
    
    console.log(item);
    
    data['id'] = item.id;
    data['text'] = item.text;
    data['checked'] = item.checked
    
    let request = new XMLHttpRequest();
    
    sendHttpAsync('PUT', BASE_URL+'todo/' + String(item.id), data, request, null);
}

function sendHttpAsync(method, url, data, xmlHttp, callback){
    xmlHttp.onreadystatechange = () => {
        // 201 성공적으로 요청을 완료 하고 새 리소스를 추가했다.
        // https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C
        if(xmlHttp.readyState == 4 && xmlHttp.status >= 200 && xmlHttp.status < 300)
            if(callback != null)
                callback();
        else if(xmlHttp.readyState == 4)
            console.log(xmlHttp.status);
    }
    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader(
        'Content-Type', 
        'application/json; charset=UTF-8');
    xmlHttp.send(JSON.stringify(data));
}

function buildTodoItem(item){
    console.log('buildTodo', item);
    let todoItem = document.createElement('div');
    todoItem.className = "todo-item";
    todoItem.id = item.id;
    
    let todoItemRemove = document.createElement("div");
    todoItemRemove.className = "todo-item-remove";
    todoItemRemove.innerHTML = "&times;";
    
    let todoItemContent = document.createElement("div");
    todoItemContent.className = "todo-item-content";
    todoItemContent.onclick = function() {
        onCheckHandle(this);
    };
    todoItemContent.innerHTML = item.text;
    
    todoItem.appendChild(todoItemRemove);
    todoItem.appendChild(todoItemContent);
    
    let todoItemCheck = document.createElement("div");
    todoItemCheck.className = "todo-item-check";
    todoItemCheck.innerHTML = "✓";
    todoItem.appendChild(todoItemCheck);    
    
    if(item.checked)
        todoItem.classList.add('checked');
    
    return todoItem;
}

function addTodoItem(item){
    let todoList = document.getElementById("todo-list");
    let todoItem = buildTodoItem(item);
    
    todos.push({
        id: item.id,
        text: item.text,
        checked: item.checked
    });
    
    todoList.appendChild(todoItem);
}

function onCheckHandle(node){
    for(var i in todos)
    {
        if(todos[i].id == node.parentNode.id)
        {
            updateTodoItem(todos[i]);
            updateTodoRequestAsync(todos[i]);
            break;
        }
    }
}

function updateTodoItem(todo){
    let node = document.getElementById(todo.id);
    todo.checked = todo.checked ^ 1
    
    if(todo.checked == 0)
        node.classList.remove('checked');
    else
        node.classList.add('checked');
}
