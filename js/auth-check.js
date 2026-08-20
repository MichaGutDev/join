import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


/**
 * Checks whether the user is logged in and, if not, redirects to index.html
 */
function checkAuth() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            
        } else {
            window.location.href = '../index.html';
        }
    })
}


checkAuth();