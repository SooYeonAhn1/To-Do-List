const path = window.location.pathname;

if (path === '/') setupHomePage();
else if (path === '/register') setupRegisterPage();
else if (path === '/login') setupLoginPage();
else if (path === '/todos') setupTodosPage();

// Home
function setupHomePage() {
    const loginBtn = document.getElementById('loginRedirect');
    const registerBtn = document.getElementById('registerRedirect');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.replace("/login");
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            window.location.replace("/register");
        });
    }
}
// Register
function setupRegisterPage() {
    const loginBtn = document.getElementById("loginRedirect");
    const checkBtn = document.getElementById("checkUsername");
    const usernameInput = document.getElementById("username");
    const formUsername = document.getElementById("formUsername");

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            window.location.replace("/login");
        });
    }

    if (checkBtn && usernameInput && formUsername) {
        checkBtn.addEventListener("click", () => {
            const value = usernameInput.value.trim();
            if (value === "") {
                alert("Username can't be empty.");
                return;
            }

            alert("Checking username: " + value);
            formUsername.value = value;
        });
    }
}

// Login
function setupLoginPage() {
    const registerBtn = document.getElementById("registerRedirect");
    const form = document.querySelector("form");
    const username = document.getElementById("username");
    const password = document.getElementById("password");


    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            window.location.replace("/register");
        });
    }

    if (form && username && password) {
        form.addEventListener("submit", (e) => {
            if (username.value.trim() === "" || password.value.trim() === "") {
                e.preventDefault();
                alert("Username and password are required.");
            }
        });
    }
}

// ToDos
function setupTodosPage() {
    const input = document.getElementById('todo');
    const list = document.getElementById('todo-list');
    const container = document.getElementById("checkboxContainer");
    const createBtn = document.getElementById("createCheckbox");

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();

    // addTodo()
    if (createBtn && input && container) {
        createBtn.addEventListener("click", () => {
            const todo = input.value.trim();
            if (todo === "") {
                alert("Please enter a task.");
                return;
            }            

            todos.push(todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            input.value = '';
            renderTodos();
        });
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        list.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            const taskRow = document.createElement('div');
            taskRow.className = 'task-row';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.class = 'dynamicCheckbox';
            checkbox.name = 'dynamicCheckbox';

            const taskText = document.createElement('span');
            taskText.textContent = todo;


            const btn = document.createElement('button');
            btn.class = "deleteBtn";
            btn.textContent = 'x';
            btn.onclick = () => deleteTodo(index);

            taskRow.appendChild(checkbox);
            taskRow.appendChild(taskText);
            taskRow.appendChild(btn);

            // const deleteWrapper = document.createElement("div");
            // deleteWrapper.className = "delete-wrapper";

            

            // deleteWrapper.append(btn);

            
            li.prepend(taskRow);
            // li.appendChild(deleteWrapper);

            list.appendChild(li);
        });
    }
    // const createBtn = document.getElementById("createCheckbox");
    // const todoInput = document.getElementById("todo");
    // const container = document.getElementById("checkboxContainer");

    // if (createBtn && todoInput && container) {
    //     createBtn.addEventListener("click", () => {
    //         const todo = todoInput.value.trim();
    //         if (todo === "") {
    //             alert("Please enter a task.");
    //             return;
    //         }
    //         const li = document.createElement('li');
    //         li.classList.add('todo-item'); // optional for CSS styling

    //         const checkbox = document.createElement('input');
    //         checkbox.type = 'checkbox';
    //         checkbox.id = 'dynamicCheckbox' + Date.now();
    //         checkbox.name = 'dynamicCheckbox';

    //         const label = document.createElement('label');
    //         label.textContent = todo;
    //         label.prepend(checkbox);

    //         li.appendChild(label);
    //         container.appendChild(li);


    //         todoInput.value = '';
    //     });
    // }
}
