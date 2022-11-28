//add windows api
//goals 1 displays graph from goals_02a and goals_02b
var currentUser


function weightData() {
    let CurrentWeight = parseInt(document.getElementById("currentWeight").value);
    let GoalWeight = parseInt(document.getElementById("goalWeight").value);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.update({
                currentweight: CurrentWeight,
                goalweight: GoalWeight
            })
                .then(() => {
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
                currentweight: firebase.firestore.FieldValue.delete(),
                goalweight: firebase.firestore.FieldValue.delete()
            })
                .then(() => {
                    alert("Graph has been reset.")
                    window.location.reload()
                })
        }
    })
}


var xValues = ["Current Weight", "Goal Weight", "Weight Progress"];
var currentWeight = 0;
var goalWeight = 0;
var weightProgress = 0;
var yValues = [currentWeight, goalWeight, weightProgress];
var barColors = ["green", "green", "red"];
Chart.defaults.font.size = 15;


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

const calculateSave = function calculate_goal() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                goalWeight = doc.data().goalweight
            })
    })
}
calculateSave()


const calculateWeightProgress = function calculate_weightProgress() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        currentUser.get()
            .then(doc => {
                weightProgress = doc.data().currentweight - doc.data().goalweight
            })
    })
}
calculateWeightProgress()

const chart_make = function charter() {
    var yValues = [currentWeight, goalWeight, weightProgress];
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
                y: { beginAtZero: true }
            }
        }
    });
}
setTimeout(chart_make, 1000);
