const inputElements = document.querySelectorAll("input");

inputElements.forEach((input) => {
  const inputId = input.getAttribute("id");
  const msg = document.querySelector(`.${inputId}-msg`);

  // call message feeback on blur
  input.addEventListener("blur", () => validateInput(input, msg));

  // trigger aggressive validation if input has been filled in before
  input.addEventListener("input", () => {
    if (hasBeenFilledInBefore(msg)) {
      validateInput(input, msg);
    }
  });

  // triggers live password confirmation
  input.addEventListener("input", () => {
    if (inputId === "password" || inputId === "password-confirm") {
      matchPasswords();
    }
  });
});

// validates all inputs
function validateInput(input, msg) {
  let valid = false;
  let text = "";

  if (input.id === "password") {
    valid = validatePassword(input);
    text = valid
      ? "✓"
      : "Password must be atleast 8 characters long, contain 1 uppercase letter, 1 number and 1 special character";
  } else if (input.id === "email") {
    valid = input.validity.valid;
    text = valid ? "✓" : "Please enter a valid email address";
  } else if (input.id === "first-name" || input.id === "last-name") {
    valid = input.value !== "";
    text = valid ? "✓" : "";
  }

  if (input.value !== "") {
    msg.textContent = text;
    updateValidClass(msg, valid);
  }

  if (input.value === "") {
    msg.textContent = "";
  }
}

// validate password
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
  return regex.test(password.value);
}

// toggle class
function updateValidClass(msg, valid) {
  if (valid) {
    msg.classList.add("valid");
    msg.classList.remove("invalid");
  } else {
    msg.classList.add("invalid");
    msg.classList.remove("valid");
  }
}

// only controls the confirm password message
function matchPasswords() {
  const passwordInput = document.getElementById("password");
  const confirmInput = document.getElementById("password-confirm");
  const confirmMsg = document.querySelector(".confirm-msg");

  // if both passwords match
  if (
    confirmInput.value === passwordInput.value &&
    passwordInput.value !== ""
  ) {
    confirmMsg.textContent = "Passwords match ✓";
    updateValidClass(confirmMsg, true);

    // if passwords dont match and both fields are filled
  } else if (
    confirmInput.value !== passwordInput.value &&
    confirmInput.value !== "" &&
    passwordInput.value !== ""
  ) {
    confirmMsg.textContent = "Passwords do not match";
    updateValidClass(confirmMsg, false);

  } else if (confirmInput.value === "" || passwordInput.value === "") {
    confirmMsg.textContent = "";
  }
}

// display red border and shake effect on empty fields
// when submit button is clicked
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    event.preventDefault();
    inputElements.forEach((input) => {
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

// check if msg has been given the valid or invalid class before
// if so, it means it has previously recieved an input
function hasBeenFilledInBefore(msg) {
  if (msg.classList.contains("valid") || msg.classList.contains("invalid")) {
    return true;
  }
}
