//add windows api
//goals 1 displays graph from goals_02a and goals_02b
var currentUser

function Financial() {
    let WeeklyBudget = document.getElementById("weeklyBudget").value;
    let SaveAmount = document.getElementById("saveAmount").value;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.update({
                weeklybudget: WeeklyBudget,
                saveamount: SaveAmount
            })
                .then(() => {
                    console.log("Document successfully updated!");
                })



        } else {
            // No user is signed in.
        }
    })
}

function saveUserInfo() {
    var currentUser = db.collection("users").doc(user.uid)
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

var xValues = ["Calories"];
var calories = 0
var yValues = [calories];
var barColors = ["red"];
Chart.defaults.font.size = 15;



const calculate = function calculate_calories() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                calories = doc.data().weeklybudget
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
