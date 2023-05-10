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
const allInputs = document.querySelectorAll("input");

passwordInput.addEventListener("blur", validationMsg);
passwordInput.addEventListener("input", aggressiveFeedback);
passwordInput.addEventListener("input", checkStatus);
passwordInput.addEventListener("input", matchPasswords);

confirmInput.addEventListener("input", matchPasswords);
confirmInput.addEventListener("input", checkStatus);

emailInput.addEventListener("blur", validateEmail);
emailInput.addEventListener("input", aggressiveFeedback);
emailInput.addEventListener("input", checkStatus);

firstNameInput.addEventListener("blur", validateName);
firstNameInput.addEventListener("input", aggressiveFeedback);
firstNameInput.addEventListener("input", checkStatus);

lastNameInput.addEventListener("blur", validateName);
lastNameInput.addEventListener("input", aggressiveFeedback);
lastNameInput.addEventListener("input", checkStatus);

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
    // if passwords dont match and both fields are not empty
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
function validateName(e) {
  if (e.target.value !== "" && e.target.id === "first-name") {
    firstNameMsg.textContent = "✓";
    firstNameMsg.classList.add("valid");
  } else if (e.target.value !== "" && e.target.id === "last-name") {
    lastNameMsg.textContent = "✓";
    lastNameMsg.classList.add("valid");
  }
}

// display red border on empty fields when submit button is clicked
function validateForm(event) {
  event.preventDefault();
  for (let i = 0; i < allInputs.length; i++) {
    if (allInputs[i].value === "") {
      allInputs[i].classList.add("required-border");
      allInputs[i].addEventListener("input", removeClass);
    }
  }
}

// remove red border
function removeClass() {
  this.classList.remove("required-border");
}

// shake required fields when empty
function shake(event) {
  event.preventDefault();
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
function checkStatus(e) {
  if (e.target.value === "") {
    let msg = e.target.nextElementSibling;
    msg.textContent = "";
  }
}

// display message only when user clicks away from filled field
// but when user clicks back into field, update in real time
function aggressiveFeedback() {
  const input = this;
  const inputId = input.getAttribute("id");
  const msg = document.querySelector(`.${inputId}-msg`);
  const feedback =
    msg.classList.contains("valid") || msg.classList.contains("invalid");
  console.log(feedback);

  if (feedback) {
    if (inputId === "password" && feedback) {
      validationMsg();
    } else if (inputId === "email" && feedback) {
      validateEmail();
    } else if (
      (inputId === "first-name" || inputId === "last-name") &&
      feedback
    ) {
      validateName();
    }
  }
}
