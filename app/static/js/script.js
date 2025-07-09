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
    const createBtn = document.getElementById("createCheckbox");
    const todoInput = document.getElementById("todo");
    const container = document.getElementById("checkboxContainer");

    if (createBtn && todoInput && container) {
        createBtn.addEventListener("click", () => {
            const todo = todoInput.value.trim();
            if (todo === "") {
                alert("Please enter a task.");
                return;
            }
            const li = document.createElement('li');
            li.classList.add('todo-item'); // optional for CSS styling

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = 'dynamicCheckbox' + Date.now();
            checkbox.name = 'dynamicCheckbox';

            const label = document.createElement('label');
            label.textContent = todo;
            label.prepend(checkbox);

            li.appendChild(label);
            container.appendChild(li);


            todoInput.value = '';
        });
    }
}
