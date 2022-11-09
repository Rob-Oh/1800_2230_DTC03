var hikeID = localStorage.getItem("food_id");    //visible to all functions on this page
var food_name = localStorage.getItem("food_name");    //visible to all functions on this page
var calories = localStorage.getItem("calories");    //visible to all functions on this page


function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;        // get value of the "name" key
                var calories = doc.data().calories;   // get value of the "details" key
                var hikeID = doc.data().id; //gets the unique CODE field
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = calories;
                newcard.querySelector('button').onclick = () => set_food_data(hikeID, title, calories);
                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById("food_container").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}


displayCards("logs");

function set_food_data(id, food_name, calories) {
    console.log("set food data")
    localStorage.setItem('food_id', id);
    localStorage.setItem('food_name', food_name)
    localStorage.setItem('calories', calories)
}


function delete_log() {
    console.log("delete log")
    food_id = hikeID
    console.log(food_id)
    // db.collection("logs").doc("DC").delete()
    db.collection("logs").where("id", "==", food_id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log("I'm here");
                // doc.data() is never undefined for query doc snapshots
                doc.ref.delete();
                console.log("deleted");
            })
        });
    alert("Item has been removed.")
}

