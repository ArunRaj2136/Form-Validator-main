const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

////////////functions/////////////
/////show error input message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

////show success input message
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

////////////email valid
function checkEmail(input) {
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "Email is not valid");
    }
}

///////////////checking required feilds
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if (input.value === "") {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

/////////////checking input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

////////////check password match
function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Password do not match");
    }
}

////////////get feildname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//////////////event handlers/////////
form.addEventListener("submit", function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    checkLength(username, 4, 15);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordMatch(password, password2);
});