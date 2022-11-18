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
