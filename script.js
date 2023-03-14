
const passwordInput = document.querySelector('#password')
const confirmInput = document.querySelector('#password-confirm')
const confirmMsg = document.querySelector('.confirm-msg')
const passwordMsg = document.querySelector('.password-msg')

passwordInput.addEventListener('input', validationMsg)
confirmInput.addEventListener('input', matchPasswords)

//CONFIRM IF PASSWORDS MATCH

function matchPasswords(e) {
    if(e.target.value === passwordInput.value) {
        confirmMsg.textContent = "Passwords match ✓"
        confirmMsg.classList.add("valid");
        confirmMsg.classList.remove("invalid")
    } else {
        confirmMsg.textContent = "Passwords do not match*"
        confirmMsg.classList.add("invalid");
        confirmMsg.classList.remove("valid");
    }
}

//CONFIRM IF PASSWORD MATCHES PATTERN

function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    return regex.test(password)
  }


function validationMsg() {
    let input = passwordInput.value
    if(validatePassword(input)) {
        passwordMsg.textContent = "✓"
        passwordMsg.classList.add("valid")
    }
    else {
        passwordMsg.textContent = 
        "Password must be atleast 8 characters long, contain 1 uppercase letter, 1 number and 1 special character"
        passwordMsg.classList.add("invalid")
    }
}









