let loginForm = document.getElementById("login-form");

function validateForm(event) {
    event.preventDefault(); // Moved to top
    
    let username = document.getElementById("username");
    let userNameError = document.getElementById("username-error");
    let password = document.getElementById("password");
    let passwordError = document.getElementById("password-error");
    let isValid = true;

    // Validate username
    if (!username.checkValidity()) {
        userNameError.textContent = username.validationMessage;
        makeInvalid(username);
        isValid = false;
    } else if (username.value.length < 3) { 
        userNameError.textContent = "error!: username must be 3 characters long";
        isValid = false;
    } else {
        console.log("username pass", username.checkValidity());
        makeValid(username);
    }

    // Validate password
    if (!password.checkValidity()) {
        passwordError.textContent = password.validationMessage;
        makeInvalid(password);
        isValid = false;
    } else if (password.value.length < 3) {
        passwordError.textContent = "error!: password must be at least 3 characters long";
        isValid = false;
    } else {
        console.log("password pass", password.checkValidity());
        makeValid(password);
    }

    // If valid, show loader and redirect
    if (isValid) {
        const loader = document.getElementById('loader');
        loader.style.display = 'block';
        
        setTimeout(function () {
            loader.style.display = 'none';
            window.location.href = 'Blog.html';
        }, 2000);
    }
}

// Add event listener
loginForm.addEventListener("submit", validateForm);

// i need these helper functions:
function makeInvalid(element) {
    element.style.border = "2px solid red";
}

function makeValid(element) {
    element.style.border = "2px solid green";
}