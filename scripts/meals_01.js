


function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");
    db.collection(collection).get()
        .then(document_array => {
            document_array.forEach(doc => {
                var food_name = doc.data().name;
                var calories = doc.data().calories;
                var food_id = doc.data().id;
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('.card-title').innerHTML = food_name;
                newcard.querySelector('.card-text').innerHTML = calories;
                newcard.querySelector('button').onclick = () => delete_log();
                newcard.querySelector('div').onclick = () => set_food_data(food_id, food_name, calories);
                document.getElementById("food_container").appendChild(newcard);
            })
        })
}


function set_food_data(id, food_name, calories) {
    console.log("set food data")
    localStorage.setItem('food_id', id);
    localStorage.setItem('food_name', food_name)
    localStorage.setItem('calories', calories)
    console.log("Set food:", food_name)
}



function delete_log() {
    var food_name = localStorage.getItem("food_name");
    var food_id = localStorage.getItem("food_id");
    console.log("Delete:", food_name)
    db.collection("logs").where("id", "==", food_id)
        .get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete();
                console.log("Deleted:", food_name);
            })
        });
    setTimeout(() => { window.location.reload() }, 600);
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
setTimeout(chart_make, 600);
