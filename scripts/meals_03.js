var food_id = localStorage.getItem("food_id");
var food_name = localStorage.getItem("food_name");
var calories = localStorage.getItem("calories");


function get_food_details(food_id) {
    db.collection("food_items").where("id", "==", food_id)
        .get().then(query_snapshot => {
            var thisHike = query_snapshot.docs[0].data();
            let name = thisHike.name;
            let calories = thisHike.calories;
            document.getElementById("food_name").innerHTML = name;
            document.getElementById("calories").innerHTML = calories;
        })
}


function add_item() {
    let local_name = food_name;
    let local_id = food_id;
    let local_calories = calories;

    db.collection("logs").add({
        name: local_name,
        id: local_id,
        calories: local_calories,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        window.location.href = "./meals_01.html"; //new line added
    })
}


function favorite() {
    let local_name = food_name;
    let local_id = hikeID;
    let local_calories = calories;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.update({
                favorite_food: local_name,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            console.log("updated")
        }
    }
    )
}


get_food_details(food_id);