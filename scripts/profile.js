// Global variable: current user
var currentUser


// Insert user name
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;
            $("#name-goes-here").text(user_Name);

        } else {
            $("#name-goes-here").text("Guest");
        }
    });
}


// Fill form fields with information on user profile
function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get().then(userDoc => {
                var userName = userDoc.data().name;
                var userSchool = userDoc.data().school;
                var userFave = userDoc.data().favorite_food;
                var user_weight = userDoc.data().weight;
                var user_age = userDoc.data().age;
                var user_height = userDoc.data().height;
                var user_sex = userDoc.data().sex
                var user_activity = userDoc.data().activity_level

                //if the data fields are not empty, then write them in to the form.
                if (userName != null) {
                    document.getElementById("nameInput").value = userName;
                }
                if (userSchool != null) {
                    document.getElementById("schoolInput").value = userSchool;
                }
                if (userFave != null) {
                    document.getElementById("foodInput").value = userFave;
                }
                if (user_weight != null) {
                    document.getElementById("weight_input").value = user_weight;
                }
                if (user_age != null) {
                    document.getElementById("age_input").value = user_age;
                }
                if (user_height != null) {
                    document.getElementById("height_input").value = user_height;
                }
                if (user_sex != null) {
                    document.getElementById("sex_input").value = user_sex;
                }
                if (user_activity != null) {
                    document.getElementById("activity_input").value = user_activity;
                }
            })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}


// Edit user form fields
function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}


// Save user form information
function saveUserInfo() {
    var userName = document.getElementById('nameInput').value;
    var userSchool = document.getElementById('schoolInput').value;
    var userFave = document.getElementById('foodInput').value;
    var user_weight = document.getElementById('weight_input').value;
    var user_age = document.getElementById('age_input').value;
    var user_height = document.getElementById('height_input').value;
    var user_sex = document.getElementById('sex_input').value;
    var user_activity = document.getElementById('activity_input').value;

    // Update user document fields
    currentUser.update({
        name: userName,
        school: userSchool,
        favorite_food: userFave,
        weight: user_weight,
        age: user_age,
        height: user_height,
        sex: user_sex,
        activity_level: user_activity
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;
}


// Call the functions
insertName();
populateInfo();