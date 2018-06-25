function showSignUp() {
    document.getElementById("backToSignIn").style.display = "block";
    document.getElementById("signUp").style.display = "block";

    document.getElementById("signIn").style.display = "none";
    document.getElementById("showSignUp").style.display = "none";
    document.getElementById("forgotPass").style.display = "none";

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function backToSignIn() {
    document.getElementById("backToSignIn").style.display = "none";
    document.getElementById("signUp").style.display = "none";
    document.getElementById("submitForgotPass").style.display = "none";

    document.getElementById("signIn").style.display = "block";
    document.getElementById("showSignUp").style.display = "block";
    document.getElementById("forgotPass").style.display = "block";

    document.getElementById("email").value = "";
    document.getElementById("password").style.display = "block";
    document.getElementById("password").value = "";
}

function signIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
        // [END authwithemail]
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                window.location = 'index.html'; //After successful login, user will be redirected to home.html
            }
        });
    }
}

function signUp() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a longer password.');
        return;
    }
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });

    alert("Sign up successful.")
    // [END createwithemail]
    firebase.auth().onAuthStateChanged(user => {
            if(user) {
                window.location = 'index.html'; //After successful login, user will be redirected to home.html
            }
    });
}

function forgotPass() {
    document.getElementById("backToSignIn").style.display = "block";
    document.getElementById("signUp").style.display = "none";

    document.getElementById("signIn").style.display = "none";
    document.getElementById("showSignUp").style.display = "none";
    document.getElementById("forgotPass").style.display = "none";

    document.getElementById("submitForgotPass").style.display = "block";
    document.getElementById("password").style.display = "none";

    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}

function submitForgotPass() {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
}