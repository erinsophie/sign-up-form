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
const submitBtn = document.querySelector(".create-account-btn");

passwordInput.addEventListener("blur", validationMsg);
passwordInput.addEventListener("input", aggressiveFeedback);
passwordInput.addEventListener("input", matchPasswords);
passwordInput.addEventListener("input", () =>
  checkStatus(passwordInput, passwordMsg)
);

confirmInput.addEventListener("input", matchPasswords);
confirmInput.addEventListener("input", () =>
  checkStatus(confirmInput, confirmMsg)
);

emailInput.addEventListener("blur", validateEmail);
emailInput.addEventListener("input", aggressiveFeedback);
emailInput.addEventListener("input", () => checkStatus(emailInput, emailMsg));

firstNameInput.addEventListener("blur", validateFirstName);
firstNameInput.addEventListener("input", aggressiveFeedback);
firstNameInput.addEventListener("input", () =>
  checkStatus(firstNameInput, firstNameMsg)
);

lastNameInput.addEventListener("blur", validateLastName);
lastNameInput.addEventListener("input", aggressiveFeedback);
lastNameInput.addEventListener("input", () =>
  checkStatus(lastNameInput, lastNameMsg)
);

submitBtn.addEventListener("click", validateForm);

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
function matchPasswords() {
  // if both passwords match
  if (
    confirmInput.value === passwordInput.value &&
    passwordInput.value !== ""
  ) {
    confirmMsg.textContent = "Passwords match ✓";
    valid = true;
    updateValidClass(confirmMsg);
    // if passwords dont match and both fields are filled
  } else if (
    confirmInput.value !== passwordInput.value &&
    confirmInput.value !== "" &&
    passwordInput.value !== ""
  ) {
    confirmMsg.textContent = "Passwords do not match";
    valid = false;
    updateValidClass(confirmMsg);
  }
}

// confirm if password matches pattern
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
  return regex.test(password);
}

// password feeback message
function validationMsg() {
  if (validatePassword(passwordInput.value)) {
    passwordMsg.textContent = "✓";
    valid = true;
    updateValidClass(passwordMsg);
  } else if (
    passwordInput.value !== "" &&
    !validatePassword(passwordInput.value)
  ) {
    passwordMsg.textContent =
      "Password must be atleast 8 characters long, contain 1 uppercase letter, 1 number and 1 special character";
    valid = false;
    updateValidClass(passwordMsg);
  }
}

// email feedback message
function validateEmail() {
  if (emailInput.validity.valid) {
    emailMsg.textContent = "✓";
    valid = true;
    updateValidClass(emailMsg);
  } else if (emailInput.value !== "" && !emailInput.validity.valid) {
    emailMsg.textContent = "Please enter a valid email address";
    valid = false;
    updateValidClass(emailMsg);
  }
}

// require name fields
function validateFirstName() {
  if (firstNameInput.value !== "") {
    firstNameMsg.textContent = "✓";
    firstNameMsg.classList.add("valid");
  }
}

function validateLastName() {
  if (lastNameInput.value !== "") {
    lastNameMsg.textContent = "✓";
    lastNameMsg.classList.add("valid");
  }
}

// display red border and shake effect on empty fields 
// when submit button is clicked
function validateForm(event) {
  const allInputs = document.querySelectorAll("input");

  allInputs.forEach((input) => {
    if (input.value === "") {
      event.preventDefault();
      input.classList.add("required-border");
      input.classList.add("shake");
  
      // when the user starts typing again, remove the red border
      input.addEventListener("input", () => {
        input.classList.remove("required-border");
      });

      // set timeout on the shake event
      setTimeout(() => {
        input.classList.remove("shake");
      }, 600);
    }
  });
}


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
      validationMsg();
    } else if (inputId === "email") {
      validateEmail();
    } else if (inputId === "first-name") {
      validateFirstName();
    } else if (inputId === "last-name") {
      validateLastName();
    }
  }
}
