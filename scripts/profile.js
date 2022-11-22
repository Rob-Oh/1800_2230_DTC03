function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#name-goes-here").text(user_Name); //using jquery

        } else {
            // No user is signed in.
        }
    });
}
insertName(); //run the function

var currentUser

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSchool = userDoc.data().school;
                    var userFave = userDoc.data().favorite_food;
                    var user_weight = userDoc.data().user_weight;
                    var user_age = userDoc.data().age;
                    var user_height = userDoc.data().height;
                    var user_sex = userDoc.data().sex

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
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 
populateInfo();

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    var userName = document.getElementById('nameInput').value;
    var userSchool = document.getElementById('schoolInput').value;
    var userFave = document.getElementById('foodInput').value;
    var user_weight = document.getElementById('weight_input').value;
    var user_age = document.getElementById('age_input').value;
    var user_height = document.getElementById('height_input').value;
    var user_sex = document.getElementById('sex_input').value;

    currentUser.update({
        name: userName,
        school: userSchool,
        favorite_food: userFave,
        weight: user_weight,
        age: user_age,
        height: user_height,
        sex: user_sex
    })
        .then(() => {
            console.log("Document successfully updated!");
        })

    document.getElementById('personalInfoFields').disabled = true;
}