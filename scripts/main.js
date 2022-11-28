// Insert user name
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            console.log(user.displayName);
            user_name = user.displayName;
            $("#name-goes-here").text(user_name);

        } else {
            $("#name-goes-here").text("Guest");
        }
    });
}


// Function call
insertName();