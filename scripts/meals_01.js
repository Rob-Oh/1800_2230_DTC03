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
    setTimeout(() => { window.location.reload() }, 1000);
}


function graph_overall() {
    var calories = 0
    var barColors = ["red"];
    Chart.defaults.font.size = 15;


    function calculate() {
        db.collection("logs").get()
            .then(collection => {
                collection.forEach((doc) => {
                    calories = calories + parseInt(doc.data().calories)
                    console.log(calories)
                })
            })
    }


    function chart_make() {
        calculate()
        var yValues = [calories];
        var xValues = ["Calories"];
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
    calculate()
    setTimeout(chart_make, 600);
}


graph_overall();
displayCards("logs");
