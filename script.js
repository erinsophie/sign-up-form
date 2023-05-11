const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#password-confirm");
const confirmMsg = document.querySelector(".confirm-msg");
const passwordMsg = document.querySelector(".password-msg");
const emailMsg = document.querySelector(".email-msg");
const emailInput = document.querySelector("#email");
const firstNameInput = document.querySelector("#first-name");
const firstNameMsg = document.querySelector(".first-name-msg");
const lastNameInput = document.querySelector("#last-name");
const lastNameMsg = document.querySelector(".last-name-msg");

//password
passwordInput.addEventListener("blur", () =>
  validationMsg(passwordInput, passwordMsg)
);
passwordInput.addEventListener("input", () =>
  matchPasswords(passwordInput, confirmInput, confirmMsg)
);
passwordInput.addEventListener("input", () =>
  checkStatus(passwordInput, passwordMsg)
);
passwordInput.addEventListener("input", aggressiveFeedback);

// confirm password
confirmInput.addEventListener("input", () =>
  matchPasswords(passwordInput, confirmInput, confirmMsg)
);
confirmInput.addEventListener("input", () =>
  checkStatus(confirmInput, confirmMsg)
);

// email
emailInput.addEventListener("blur", () => validateEmail(emailInput, emailMsg));
emailInput.addEventListener("input", () => checkStatus(emailInput, emailMsg));
emailInput.addEventListener("input", aggressiveFeedback);

// first name
firstNameInput.addEventListener("blur", () => validateFirstName(firstNameInput, firstNameMsg));
firstNameInput.addEventListener("input", () =>
  checkStatus(firstNameInput, firstNameMsg)
);
firstNameInput.addEventListener("input", aggressiveFeedback);

// last name
lastNameInput.addEventListener("blur", () => validateLastName(lastNameInput, lastNameMsg));
lastNameInput.addEventListener("input", () =>
  checkStatus(lastNameInput, lastNameMsg)
);
lastNameInput.addEventListener("input", aggressiveFeedback);

let valid;

// toggle class
function updateValidClass(msg) {
  if (valid) {
    msg.classList.add("valid");
    msg.classList.remove("invalid");
  } else {
    msg.classList.add("invalid");
    msg.classList.remove("valid");
  }
}

// confirm if passwords match
function matchPasswords(password, confirmPassword, msg) {
  // if both passwords match
  if (confirmPassword.value === password.value && password.value !== "") {
    msg.textContent = "Passwords match ✓";
    valid = true;
    updateValidClass(msg);
    // if passwords dont match and both fields are filled
  } else if (
    confirmPassword.value !== password.value &&
    confirmPassword.value !== "" &&
    password.value !== ""
  ) {
    msg.textContent = "Passwords do not match";
    valid = false;
    updateValidClass(msg);
  }
}

// password feeback message
function validationMsg(password, msg) {
  // use setCustomValidity to define the custom validation
  const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
  if (!regex.test(passwordInput.value)) {
    password.setCustomValidity("Invalid");
  } else {
    password.setCustomValidity("");
  }

  if (password.validity.valid) {
    msg.textContent = "✓";
    valid = true;
    updateValidClass(msg);
  } else if (password.value !== "" && !password.validity.valid) {
    msg.textContent =
      "Password must be atleast 8 characters long, contain 1 uppercase letter, 1 number and 1 special character";
    valid = false;
    updateValidClass(msg);
  }
}

// email feedback message
function validateEmail(email, msg) {
  if (email.validity.valid) {
    msg.textContent = "✓";
    valid = true;
    updateValidClass(msg);
  } else if (email.value !== "" && !email.validity.valid) {
    msg.textContent = "Please enter a valid email address";
    valid = false;
    updateValidClass(msg);
  }
}

// require name fields
function validateFirstName(name, msg) {
  if (name.value !== "") {
    msg.textContent = "✓";
    msg.classList.add("valid");
  }
}

function validateLastName(name, msg) {
  if (name.value !== "") {
    msg.textContent = "✓";
    msg.classList.add("valid");
  }
}

// display red border and shake effect on empty fields
// when submit button is clicked
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  const allInputs = document.querySelectorAll("input");
  if (!form.checkValidity()) {
    event.preventDefault();
    allInputs.forEach((input) => {
      if (input.value === "") {
        input.classList.add("required-border");
        input.classList.add("shake");

        // when the user starts typing again, remove the red border
        input.addEventListener("input", () => {
          input.classList.remove("required-border");
        });

        // set timeout on the shake class
        setTimeout(() => {
          input.classList.remove("shake");
        }, 600);
      }
    });
  }
});

// do not display message when field is blank and user clicks out of it
function checkStatus(inputElement, msgElement) {
  if (inputElement.value === "") {
    msgElement.textContent = "";
  }
}

// check if msg has been given the valid or invalid class before
// if so, it means it has previously recieved input
function hasBeenFilledInBefore(msg) {
  if (msg.classList.contains("valid") || msg.classList.contains("invalid")) {
    return true;
  }
}

// trigger aggressive feedback
function aggressiveFeedback() {
  const input = this;
  const inputId = input.getAttribute("id");
  const msg = document.querySelector(`.${inputId}-msg`);

  if (hasBeenFilledInBefore(msg)) {
    if (inputId === "password") {
      validationMsg(passwordInput, passwordMsg);
    } else if (inputId === "email") {
      validateEmail(emailInput, emailMsg);
    } else if (inputId === "first-name") {
      validateFirstName(firstNameInput, firstNameMsg);
    } else if (inputId === "last-name") {
      validateLastName(lastNameInput, lastNameMsg);
    }
  }
}
