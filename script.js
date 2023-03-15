
const passwordInput = document.querySelector('#password')
const confirmInput = document.querySelector('#password-confirm')
const confirmMsg = document.querySelector('.confirm-msg')
const passwordMsg = document.querySelector('.password-msg')
const emailMsg = document.querySelector('.email-msg')
const emailInput = document.querySelector('#email')
const submitBtn = document.querySelector('.create-account-btn')
const nameMsg = document.querySelectorAll('.name-msg')
const firstNameInput = document.querySelector('#first-name')
const lastNameInput = document.querySelector('#last-name')
const allInputs = document.querySelectorAll('input')


let feedback = false 

passwordInput.addEventListener('blur', validationMsg)
passwordInput.addEventListener('input', aggressiveFeedback)
passwordInput.addEventListener('blur', checkStatus)
confirmInput.addEventListener('input', matchPasswords)
emailInput.addEventListener('blur', validateEmail)
emailInput.addEventListener('input', aggressiveFeedback)
emailInput.addEventListener('blur', checkStatus)
submitBtn.addEventListener('click', validateForm)


//CONFIRM IF PASSWORDS MATCH

function matchPasswords() {
    if(confirmInput.value === passwordInput.value && passwordInput.value !== '') {
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


  // PASSWORD FEEDBACK


function validationMsg() {
    let input = passwordInput.value
    if (validatePassword(input)) {
        feedback = true
        passwordMsg.textContent = "✓"
        passwordMsg.classList.add("valid")
        passwordMsg.classList.remove("invalid")
    }
    else if (input.value !== '' && !validatePassword(input)) {
        feedback = true
        passwordMsg.textContent = 
        "Password must be atleast 8 characters long, contain 1 uppercase letter, 1 number and 1 special character"
        passwordMsg.classList.add("invalid")
        passwordMsg.classList.remove("valid")
    }
}

// EMAIL FEEDBACK

function validateEmail() {
    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (validEmail.test(emailInput.value)) {
        feedback = true
        emailMsg.textContent = "✓"
        emailMsg.classList.add("valid")
        emailMsg.classList.remove("invalid")
    } else if (emailInput.value !== '' && !validEmail.test(emailInput.value)) {
        feedback = true
        emailMsg.textContent = "Please enter a valid email address"
        emailMsg.classList.add("invalid")
        emailMsg.classList.remove("valid")
    }
}

// DISPLAY REQUIRED MESSAGE BELOW EMPTY FIELDS WHEN BUTTON IS CLICKED

function validateForm() {
    for(let i = 0; i < allInputs.length; i++) {
        if(allInputs[i].value === '') {
            allInputs[i].classList.add('required-border')
        }
    }
}

// CLEAR MESSAGE WHEN FIELD IS BLANK AND USER CLICKS OUT OF IT

function checkStatus(e) {
    if(e.target.value === '') {
       let msg = e.target.nextElementSibling
       msg.textContent = ""
    }
}

// UPDATE MSG ONLY WHEN USER CLICKS AWAY BUT WHEN USER CLICKS BACK INTO FIELD, UPDATE IN REAL TIME

function aggressiveFeedback() {
    if(feedback && passwordInput.value !== '') {
        validationMsg()
     } else if (feedback && emailInput.value !== '') {
        validateEmail()
     }
}




















