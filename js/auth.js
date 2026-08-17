import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, signInAnonymously, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/**
 * Validates the email format using a regular expression.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} True if the email format is valid.
 */
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


/**
 * Handles the login formm submission.
 * 
 * @param {SubmitEvent} event - The form submit event.
 * @returns {void}
 */
function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!isValidEmail(email)) {
        return;
    }

    handleFirebaseLogin(email, password);
}


/**
 * Signs in the user with Firebase using email and password.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 */
function handleFirebaseLogin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'html/summary.html';
        })
        .catch((error) => {
            console.log(error);
        });
}


document.getElementById('login-form').addEventListener('submit', login);


















































