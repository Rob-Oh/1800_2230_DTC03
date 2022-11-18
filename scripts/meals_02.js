function set_food_data(id, food_name, calories) {
    localStorage.setItem('food_id', id);
    localStorage.setItem('food_name', food_name)
    localStorage.setItem('calories', calories)
}


function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var calories = doc.data().calories;
                var food_id = doc.data().id;
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = calories;
                newcard.querySelector('a').onclick = () => set_food_data(food_id, title, calories);
                document.getElementById("food_container").appendChild(newcard);
            })
        })
}


displayCards("food_items");