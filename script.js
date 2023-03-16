
const passwordInput = document.querySelector('#password')
const confirmInput = document.querySelector('#password-confirm')
const confirmMsg = document.querySelector('.confirm-msg')
const passwordMsg = document.querySelector('.password-msg')
const emailMsg = document.querySelector('.email-msg')
const emailInput = document.querySelector('#email')
const submitBtn = document.querySelector('.create-account-btn')
const firstNameInput = document.querySelector('#first-name')
const firstNameMsg = document.querySelector('.first-name-msg')
const lastNameInput = document.querySelector('#last-name')
const lastNameMsg = document.querySelector('.last-name-msg')
const allInputs = document.querySelectorAll('input')


passwordInput.addEventListener('blur', validationMsg)
passwordInput.addEventListener('input', aggressiveFeedback)
passwordInput.addEventListener('input', checkStatus)

confirmInput.addEventListener('input', matchPasswords)
confirmInput.addEventListener('input', checkStatus)

emailInput.addEventListener('blur', validateEmail)
emailInput.addEventListener('input', aggressiveFeedback)
emailInput.addEventListener('input', checkStatus)

firstNameInput.addEventListener('blur', validateName)
firstNameInput.addEventListener('input', aggressiveFeedback)
firstNameInput.addEventListener('input', checkStatus)

lastNameInput.addEventListener('blur', validateName)
lastNameInput.addEventListener('input', aggressiveFeedback)
lastNameInput.addEventListener('input', checkStatus)


submitBtn.addEventListener('click', validateForm)


//CONFIRM IF PASSWORDS MATCH

function matchPasswords() {
    if(confirmInput.value === passwordInput.value && passwordInput.value !== '') {
        confirmMsg.textContent = "Passwords match ✓"
        confirmMsg.classList.add("valid");
        confirmMsg.classList.remove("invalid")
    } else {
        confirmMsg.textContent = "Passwords do not match"
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
    if (validatePassword(passwordInput.value)) {
        passwordMsg.textContent = "✓"
        passwordMsg.classList.add("valid")
        passwordMsg.classList.remove("invalid")
    } else if (passwordInput.value !== '' && !validatePassword(passwordInput.value)) {
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
        emailMsg.textContent = "✓"
        emailMsg.classList.add("valid")
        emailMsg.classList.remove("invalid")
    } else if (emailInput.value !== '' && !validEmail.test(emailInput.value)) {
        emailMsg.textContent = "Please enter a valid email address"
        emailMsg.classList.add("invalid")
        emailMsg.classList.remove("valid")
    }
}

// REQUIRE NAME FIELDS 

function validateName(e) {                
    if(e.target.value !== '' && e.target.id === 'first-name') {
        firstNameMsg.textContent = "✓"
        firstNameMsg.classList.add("valid")
    } else if (e.target.value !== '' && e.target.id === 'last-name') {
        lastNameMsg.textContent = "✓"
        lastNameMsg.classList.add("valid")
    }
}

// DISPLAY RED BORDER ON EMPTY FIELDS WHEN BUTTON IS CLICKED

function validateForm() {
    for(let i = 0; i < allInputs.length; i++) {
        if(allInputs[i].value === '') {
            allInputs[i].classList.add('required-border')
            allInputs[i].addEventListener('input', removeClass)
            }
        }
    }

    function removeClass() {
        this.classList.remove('required-border')
}



// CLEAR MESSAGE WHEN FIELD IS BLANK AND USER CLICKS OUT OF IT

function checkStatus(e) {
    if(e.target.value === '') {
       let msg = e.target.nextElementSibling
       msg.textContent = ''
    }
}

// UPDATE MSG ONLY WHEN USER CLICKS AWAY BUT WHEN USER CLICKS BACK INTO FIELD, UPDATE IN REAL TIME

function aggressiveFeedback() {
    const input = this;
    const inputId = input.getAttribute('id');
    const msg = document.querySelector(`.${inputId}-msg`);
    const feedback = msg.classList.contains('valid') || msg.classList.contains('invalid');
    console.log(feedback)

    if (feedback) {
        if (inputId === 'password' && feedback) {
            validationMsg();
        } else if (inputId === 'email' && feedback) {
            validateEmail();
        } else if ((inputId === 'first-name' || inputId === 'last-name') && feedback) {
            validateName();
        }
    }
}


