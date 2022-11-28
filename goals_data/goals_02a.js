var currentUser // Creates global variable for the current user

// Grabs the data from the input button id's and stores them in variables
function Financial() {
    let WeeklyBudget = parseInt(document.getElementById("weeklyBudget").value);
    let SaveAmount = parseInt(document.getElementById("saveAmount").value);

        // Checks if the user is signed in
    firebase.auth().onAuthStateChanged(user => {
        // if user is logged in then the following code will run
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            //Updates the current user's document with the data from the input buttons
            currentUser.update({
                weeklybudget: WeeklyBudget,
                saveamount: SaveAmount
            })
            // Informs the user that they've saved their data and refreshes the page
                .then(() => {
                    console.log("Document successfully updated!");
                    alert("Your information has been saved!")
                    window.location.reload()
                })
                // if no user is logged in then the following code will run
        } else {
        }
    })
}

// Resets the users data in the database
function reset() {
    firebase.auth().onAuthStateChanged(user => {

        // if user presses the reset button then their data from this page will be deleted in the database
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            currentUser.update({
                weeklybudget: firebase.firestore.FieldValue.delete(),
                saveamount: firebase.firestore.FieldValue.delete()
            })
            // Informs the user that they've deleted their data and refreshes the page
                .then(() => {
                    alert("Graph has been reset.")
                    window.location.reload()
                })
        }
    })
}

// The following code below is used to create the chart

// Creates the x-axis labels
var xValues = ["Weekly Budget", "Savings Goal", "Savings Progress"];

// Stores the variables in the yValues of the x-axis in order
var yValues = [weeklyBudget, weeklySave, savingsProgress];

// Gloablizes the variables required for the chart
var weeklyBudget = 0;
var weeklySave = 0;
var savingsProgress = 0;
// Sets the color and font size for the graph
var barColors = ["green", "green", "red"];
Chart.defaults.font.size = 15;

// Initializes the value for the Weekly Budget from the input button
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

// Initializes the value for the Save Budget from the input button
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

// Calculates the savings progress by subtracting the weekly budget from the savings goal and stores it in the graph
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

// Creates the chart from given values and stored data
const chart_FinancialMake = function charter() {
    var yValues = [weeklyBudget, weeklySave, savingsProgress];
    new Chart("myFinancialChart", {
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
                // Sets the y-axis to start at 0
                y: { beginAtZero: true }
            }
        }
    });
}
// Calls the function to create the chart
setTimeout(chart_FinancialMake, 1000);
