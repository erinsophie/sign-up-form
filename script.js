const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#password-confirm");
const confirmMsg = document.querySelector(".confirm-msg");
const passwordMsg = document.querySelector(".password-msg");
const emailMsg = document.querySelector(".email-msg");
const emailInput = document.querySelector("#email");
const submitBtn = document.querySelector(".create-account-btn");
const firstNameInput = document.querySelector("#first-name");
const firstNameMsg = document.querySelector(".first-name-msg");
const lastNameInput = document.querySelector("#last-name");
const lastNameMsg = document.querySelector(".last-name-msg");

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
submitBtn.addEventListener("click", shake);

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
  let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (validEmail.test(emailInput.value)) {
    emailMsg.textContent = "✓";
    valid = true;
    updateValidClass(emailMsg);
  } else if (emailInput.value !== "" && !validEmail.test(emailInput.value)) {
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

// display red border on empty fields when submit button is clicked
// display red border on empty fields when submit button is clicked
function validateForm(event) {
  event.preventDefault();
  const allInputs = document.querySelectorAll("input");

  allInputs.forEach((input) => {
    if (input.value === "") {
      input.classList.add("required-border");
      input.addEventListener("input", removeClass);
    }
  });
}

// remove red border
function removeClass() {
  this.classList.remove("required-border");
}

// shake required fields when empty
function shake(event) {
  event.preventDefault();
  const allInputs = document.querySelectorAll("input");
  
  allInputs.forEach((input) => {
    if (input.classList.contains("required-border")) {
      input.classList.add("shake");
    }
    setTimeout(() => {
      input.classList.remove("shake");
    }, 600);
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

// display message only when user clicks away from filled field the first time
// but when user clicks back into field, update message in real time
// triggering aggressiveFeedback
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
