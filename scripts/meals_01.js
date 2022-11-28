// Set the template then append to container
function displayCards(collection) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            let cardTemplate = document.getElementById("food_template");
            db.collection(collection).where("user", "==", user.uid).get()
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
    })
}


// Set the local storage data
function set_food_data(id, food_name, calories, user_id) {
    localStorage.setItem('food_id', id);
    localStorage.setItem('food_name', food_name)
    localStorage.setItem('calories', calories)
    console.log("Set food:", food_name)
}


// Read the local storage data to select which item to delete from collection
function delete_log() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            var food_name = localStorage.getItem("food_name");
            var food_id = localStorage.getItem("food_id");
            console.log("Delete:", food_name)
            db.collection("logs").where("user", "==", user.uid).where("id", "==", food_id).limit(1)
                .get().then((query_snapshot) => {
                    query_snapshot.forEach((doc) => {
                        doc.ref.delete();
                        console.log("Deleted:", food_name);
                    })
                });
            setTimeout(() => { window.location.reload() }, 1200);
        }
    })
}


// Update weight goals based on dropdown menu information
function update_goal() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            var change_goal = document.getElementById('weight_change').value;
            var change_value = document.getElementById('change_value').value;
            currentUser.update({
                goal: change_goal,
                goal_value: change_value
            })
                .then(() => {
                    console.log("Document successfully updated!");
                    setTimeout(() => { window.location.reload() }, 1000);
                })
        }
    })
}


// Create the graph
function graph_overall() {
    var calories = 0
    var goal_calories = 0
    var barColors = ["red", "green"];
    Chart.defaults.font.size = 15;

    // The logic behind the y-values on the graph
    function calculate() {
        // Calculate the goal calories value
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var currentUser = db.collection("users").doc(user.uid)
                currentUser.get().then(user_doc => {
                    // Data retrieved from values in user profile
                    var user_weight = parseInt(user_doc.data().weight);
                    var user_age = parseInt(user_doc.data().age);
                    var user_height = parseInt(user_doc.data().height);
                    var user_sex = user_doc.data().sex;
                    var user_activity = parseInt(user_doc.data().activity_level)
                    var change_goal = user_doc.data().goal
                    var change_value = parseInt(user_doc.data().goal_value)
                    if (change_goal != null) {
                        document.getElementById("weight_change").value = change_goal;
                    }
                    if (user_height != null) {
                        document.getElementById("change_value").value = change_value;
                    }

                    // Formulae are based on Basal Metabolic Rate multiplied by activity
                    if (user_sex == "male") {
                        goal_calories = user_activity * (66.5 + (13.75 * user_weight) + (5.003 * user_height) - (6.75 * user_age))
                        if (change_goal == "gain") {
                            goal_calories = goal_calories + change_value
                        }
                        if (change_goal == "lose") {
                            goal_calories = goal_calories - change_value
                        }
                    }
                    if (user_sex == "female") {
                        goal_calories = user_activity * (655.1 + (9.563 * user_weight) + (1.850 * user_height) - (4.676 * user_age))
                        if (change_goal == "gain") {
                            goal_calories = goal_calories + change_value
                        }
                        if (change_goal == "lose") {
                            goal_calories = goal_calories - change_value
                        }
                    }
                })
            }
        })
        // Calculate the current calories value
        db.collection("logs").get()
            .then(collection => {
                collection.forEach((doc) => {
                    calories = calories + parseInt(doc.data().calories)
                })
            })
    }

    // Initialize the graph
    function chart_make() {
        calculate()
        console.log("Goal calories:", goal_calories)
        var yValues = [calories, goal_calories];
        var xValues = ["Calories", "Goal"];
        new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    label: "Calorie Tracker",
                    barPercentage: 0.2,
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                label: {
                    display: false
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }


    // Call functions
    calculate()
    setTimeout(chart_make, 1200);
}


// Call functions
graph_overall();
displayCards("logs");
