function displayCards(collection) {
    let cardTemplate = document.getElementById("food_template");
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
    localStorage.setItem('food_id', id);
    localStorage.setItem('food_name', food_name)
    localStorage.setItem('calories', calories)
    console.log("Set food:", food_name)
}


function delete_log() {
    var food_name = localStorage.getItem("food_name");
    var food_id = localStorage.getItem("food_id");
    console.log("Delete:", food_name)
    db.collection("logs").where("id", "==", food_id).limit(1)
        .get().then((query_snapshot) => {
            query_snapshot.forEach((doc) => {
                doc.ref.delete();
                console.log("Deleted:", food_name);
            })
        });
    setTimeout(() => { window.location.reload() }, 1200);
}


function update_goal() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
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


function graph_overall() {
    var calories = 0
    var goal_calories = 0
    var barColors = ["red", "green"];
    Chart.defaults.font.size = 15;


    function calculate() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var currentUser = db.collection("users").doc(user.uid)
                currentUser.get().then(user_doc => {
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
        db.collection("logs").get()
            .then(collection => {
                collection.forEach((doc) => {
                    calories = calories + parseInt(doc.data().calories)
                })
            })
    }


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
    calculate()
    setTimeout(chart_make, 1200);
}


graph_overall();
displayCards("logs");
