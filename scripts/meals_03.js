function get_food_details() {
    db.collection("food_items").where("id", "==", localStorage.getItem("food_id"))
        .get().then(query_snapshot => {
            var thisHike = query_snapshot.docs[0].data();
            let name = thisHike.name;
            let calories = thisHike.calories;
            document.getElementById("food_name").innerHTML = name;
            document.getElementById("calories").innerHTML = calories;
        })
}


function add_item() {
    var food_id = localStorage.getItem("food_id");
    var calories = parseInt(localStorage.getItem("calories"));
    var food_amount = parseInt(document.getElementById('food_amount').value);
    var multiplied_calories = calories * Math.floor(food_amount / 100);
    var food_name = localStorage.getItem("food_name") + " " + food_amount + "g";
    console.log(food_name)
    console.log(multiplied_calories)
    console.log(typeof calories)
    console.log(typeof food_amount)

    db.collection("logs").add({
        name: food_name,
        id: food_id,
        calories: multiplied_calories,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        window.location.href = "./meals_01.html";
    })
}


function favorite() {
    var food_name = localStorage.getItem("food_name");
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            currentUser.update({
                favorite_food: food_name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            console.log("updated")
        }
    }
    )
}


get_food_details();