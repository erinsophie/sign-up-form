
const passwordInput = document.querySelector('#password')
const confirmInput = document.querySelector('#password-confirm')
const confirmMsg = document.querySelector('.confirm-msg')

confirmInput.addEventListener('input', matchPasswords)

//CONFIRM IF PASSWORDS MATCH

function matchPasswords(e) {
    if(e.target.value === passwordInput.value) {
        confirmMsg.textContent = "Passwords match ✓"
        confirmMsg.classList.add("valid");
        confirmMsg.classList.remove("invalid")
    } else {
        confirmMsg.textContent = "Passwords do not match x"
        confirmMsg.classList.add("invalid");
    }
}



function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  }









