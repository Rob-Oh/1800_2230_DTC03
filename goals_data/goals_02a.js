//add windows api
//goals 1 displays graph from goals_02a and goals_02b
var currentUser


function Financial() {
    let WeeklyBudget = parseInt(document.getElementById("weeklyBudget").value);
    let SaveAmount = parseInt(document.getElementById("saveAmount").value);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.update({
                weeklybudget: WeeklyBudget,
                saveamount: SaveAmount
            })
                .then(() => {
                    console.log("Document successfully updated!");
                    alert("Your information has been saved!")
                    window.location.reload()
                })
        } else {
            // No user is signed in.
        }
    })
}


function reset() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            currentUser.update({
                weeklybudget: firebase.firestore.FieldValue.delete(),
                saveamount: firebase.firestore.FieldValue.delete()
            })
                .then(() => {
                    alert("Graph has been reset.")
                    window.location.reload()
                })
        }
    })
}


var xValues = ["Weekly Budget", "Savings Goal", "Savings Progress"];
var weeklyBudget = 0;
var saveBudget = 0;
var savingsProgress = 0;
var yValues = [weeklyBudget, saveBudget, savingsProgress];
var barColors = ["green", "green", "red"];
Chart.defaults.font.size = 15;


const calculateWeek = function calculate_budget() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                weeklyBudget = doc.data().weeklybudget
            })
    })
}
calculateWeek()

const calculateSave = function calculate_savings() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                weeklySave = doc.data().saveamount
            })
    })
}
calculateSave()


const calculateProgress = function calculate_progress() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                savingsProgress = doc.data().saveamount - doc.data().weeklybudget
            })
    })
}
calculateProgress()

const chart_make = function charter() {
    var yValues = [weeklyBudget, weeklySave, savingsProgress];
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Money", 
                barPercentage: 0.1,
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
setTimeout(chart_make, 1000);
