var currentUser // Creates global variable for the current user

// Grabs the data from the input button id's and stores them in variables
function weightData() {
    let CurrentWeight = parseInt(document.getElementById("currentWeight").value);
    let GoalWeight = parseInt(document.getElementById("goalWeight").value);

            // Checks if the user is signed in
    firebase.auth().onAuthStateChanged(user => {
                // if user is logged in then the following code will run
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            //Updates the current user's document with the data from the input buttons
            currentUser.update({
                currentweight: CurrentWeight,
                goalweight: GoalWeight
            })
            // Informs the user that they've saved their data and refreshes the page            
                .then(() => {
                    alert("Your information has been saved!")
                    window.location.reload()
                })
        } else {
            // if no user is logged in then the following code will run
        }
    })
}

// Resets the users data in the database
function reset() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // if user presses the reset button then their data from this page will be deleted in the database
            var currentUser = db.collection("users").doc(user.uid)
            currentUser.update({
                currentweight: firebase.firestore.FieldValue.delete(),
                goalweight: firebase.firestore.FieldValue.delete()
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
var xValues = ["Current Weight", "Goal Weight", "Weight Difference"];

// Stores the variables in the yValues of the x-axis in order
var yValues = [currentWeight, goalWeight, weightDifference];

// Gloablizes the variables required for the chart
var currentWeight = 0;
var goalWeight = 0;
var weightDifference = 0;

// Sets the color and font size for the graph
var barColors = ["green", "green", "red"];
Chart.defaults.font.size = 15;

// Initializes the value of the current weight input button
const calculateCurrent = function calculate_current() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                currentWeight = doc.data().currentweight
            })
    })
}
calculateCurrent()

// Initializes the value of the goal weight input button
const calculateHealthProgress = function calculate_goal() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                goalWeight = doc.data().goalweight
            })
    })
}
calculateHealthProgress()

// Calculates the weight progress by subtracting the current weight from the goal weight and stores it in the graph
const calculateWeightProgress = function calculate_weightProgress() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                weightProgress = doc.data().goalweight - doc.data().currentweight
            })
    })
}
calculateWeightProgress()

// Creates the chart from given values and stored data
const chart_HealthMake = function charter() {
    var yValues = [currentWeight, goalWeight, weightDifference];
    new Chart("myHealthChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                label: "Lbs", 
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
setTimeout(chart_HealthMake, 1000);
