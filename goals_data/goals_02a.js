//add windows api
//goals 1 displays graph from goals_02a and goals_02b

function Financial() {
    let WeeklyBudget = document.getElementById("weeklyBudget").value;
    let SaveAmount = document.getElementById("saveAmount").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Financial").add({
                        userID: userID,
                        weeklybudget: WeeklyBudget,
                        saveamount: SaveAmount
                    }).then(() => {
                        window.location.href = "./goals_02a.html"; //new line added
                    })
                })

        } else {
            // No user is signed in.
        }
    });
}

function saveUserInfo() {
    WeeklyBudget = document.getElementById('weeklyBudget').value;     //get the value of the field with id="schoolInput"
    SaveAmount = document.getElementById('saveAmount').value;       //get the value of the field with id="cityInput"
    currentUser.update({
        weeklybudget: WeeklyBudget,
        saveamount: SaveAmount
    })
        .then(() => {
            console.log("Document successfully updated!");
        })
}