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
 * Handles the login form submission.
 * 
 * @param {SubmitEvent} event - The form submit event.
 * @returns {void}
 */
function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    clearError('login-error', ['email', 'password']);

    if (!isValidEmail(email)) {
        showError('login-error', ['email', 'password'], 'Check your email and password. Please try again.');
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
    const loginSubmit = document.getElementById('login-submit');
    loginSubmit.disabled = true;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'html/summary.html';
        })
        .catch((error) => {
            console.log(error);
            showError('login-error', ['email', 'password'], 'Check your email and password. Please try again.');
            loginSubmit.disabled = false;
        });
}


/**
 *Shows the success toast and redirects to the login page after a short delay. 
 */
function showToast() {
    const toast = document.getElementById('toast');
    toast.style.display = 'flex';

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 800);
}


/**
 * Handles the signup form submission.
 * 
 * @param {SubmitEvent} event - The form submit event.
 * @returns {void}
 */
function signUp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    clearError('signup-error', ['confirm-password']);

    if (password !== confirmPassword) {
        showError('signup-error', ['confirm-password'], "Your passwords don't match. Please try again.");
        return;
    }

    handleFirebaseSignUp(name, email, password);
}


/**
 * Creates a new user account with Firebase using email and password.
 * 
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 */
function handleFirebaseSignUp(name, email, password) {
    const signupSubmit = document.getElementById('signup-submit');
    signupSubmit.disabled = true;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            showToast();
        })
        .catch((error) => {
            console.log(error);
            showError('signup-error', ['email'], 'Registration failed. Please try again.');
            signupSubmit.disabled = false;
        });
}


/**
 * Shows an error message and highlights the given fields.
 * @param {string} errorId - The id of the error message element.
 * @param {string[]} fieldIds - The ids of the input fields to highlight.
 * @param {string} message - The error message to display.
 */
function showError(errorId, fieldIds, message) {
    document.getElementById(errorId).textContent = message;
    fieldIds.forEach((id) => {
        document.getElementById(id).parentElement.classList.add('auth-field--error');
    });
}


/**
 * Clears the error message and removes highlighting from the given fields.
 * @param {string} errorId - The id of the error message element.
 * @param {string[]} fieldIds - The ids of the input fields to clear.
 */
function clearError(errorId, fieldIds) {
    document.getElementById(errorId).textContent = "";
    fieldIds.forEach((id) => {
        document.getElementById(id).parentElement.classList.remove('auth-field--error');
    });
}



function togglePrivacyCheckbox() {
    const checkbox = document.getElementById('privacy-policy');
    const button = document.getElementById('signup-submit')
    button.disabled = !checkbox.checked;
}


const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', login);
}


const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', signUp);
}


const privacyCheckbox = document.getElementById('privacy-policy');
if (privacyCheckbox) {
    privacyCheckbox.addEventListener('change', togglePrivacyCheckbox);
}





















































