var hikeID = localStorage.getItem("food_id");    //visible to all functions on this page
var food_name = localStorage.getItem("food_name");    //visible to all functions on this page
var calories = localStorage.getItem("calories");    //visible to all functions on this page


function getHikeDetails(hikeCode) {
    db.collection("food_items").where("id", "==", hikeCode)
        .get()
        .then(queryHike => {
            //see how many items are returned from the query with ".size"
            size = queryHike.size;
            // get the documents returned from query with ".docs"
            Hikes = queryHike.docs;

            // We want to have one document per hike, so if the the result of 
            //the query is more than one, we can check it right now and clean the DB if needed.
            if (size = 1) {
                var thisHike = Hikes[0].data();
                let name = thisHike.name;
                let calories = thisHike.calories;
                document.getElementById("HikeName").innerHTML = name;
                document.getElementById("calories").innerHTML = calories;
            } else {
                console.log("Query has more than one data")
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}
getHikeDetails(hikeID);
console.log("test");

function writeReview() {
    console.log("inside write review")
    let local_name = food_name;
    let local_id = hikeID;
    let local_calories = calories;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("logs").add({
                        name: local_name,
                        id: local_id,
                        calories: local_calories,
                        userID: userID,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "./meals_01.html"; //new line added
                    })
                })
        } else {
            // No user is signed in.
        }
    });
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
