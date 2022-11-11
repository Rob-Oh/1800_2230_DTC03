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
                newcard.querySelector('button').onclick = () => delete_log();
                newcard.querySelector('div').onclick = () => set_food_data(hikeID, title, calories);//equiv getElementByTagName

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


function set_food_data(id, food_name, calories) {
    console.log("set food data")
    localStorage.setItem('food_id', id);
    localStorage.setItem('food_name', food_name)
    localStorage.setItem('calories', calories)
    var hikeID = localStorage.getItem("food_id");    //visible to all functions on this page
    var food_name = localStorage.getItem("food_name");    //visible to all functions on this page
    var calories = localStorage.getItem("calories");    //visible to all functions on this page
    var hikeID = localStorage.getItem("food_id");    //visible to all functions on this page
    console.log("Set food:", food_name)
}



function delete_log() {
    var food_name = localStorage.getItem("food_name");    //visible to all functions on this page
    var calories = localStorage.getItem("calories");    //visible to all functions on this page
    var hikeID = localStorage.getItem("food_id");    //visible to all functions on this page
    console.log("Delete:", food_name)
    // db.collection("logs").doc("DC").delete()
    db.collection("logs").where("id", "==", hikeID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                doc.ref.delete();
                console.log("Deleted:", food_name);
            })
        });
    alert("Item has been removed.")
}


displayCards("logs");

var xValues = ["Calories"];
var calories = 0
var yValues = [calories];
var barColors = ["red"];
Chart.defaults.font.size = 15;



const calculate = function calculate_calories() {
    db.collection("logs").get()
        .then(collection => {
            collection.forEach((doc) => {
                calories = calories + parseInt(doc.data().calories)
                console.log(calories)
            })
        })
}

console.log("Chart calories:", calories)
calculate()
const message = function () {
    console.log("Chart calories:", calories)
}


const chart_make = function charter() {
    console.log("Calories:", calories)
    var yValues = [calories]
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Today's Calories:",
                barPercentage: 0.2,
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
setTimeout(chart_make, 2000);
