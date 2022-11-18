function saveUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        food_amount = document.getElementById('data_input').value;     //get the value of the field with id="schoolInput"
        currentUser.update({
            food_amount: food_amount
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
    }
    )
}


function clear_item() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        food_amount = document.getElementById('data_input').value;     //get the value of the field with id="schoolInput"
        currentUser.update({
            food_amount: 0
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
    }
    )
}


function populate_span() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get().then(user_doc => {
            var food_amount = user_doc.data().food_amount
            document.getElementById("amount").innerHTML = food_amount
            console.log(user_doc)
        })


    }
    )
}


populate_span()
