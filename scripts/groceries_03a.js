function set_food_data(id, food_name, price) {
    localStorage.setItem('food_id', id);
    localStorage.setItem('food_name', food_name)
    localStorage.setItem('price', price)
}


function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            snap.forEach(doc => {
                var title = doc.data().name;
                var calories = doc.data().price;
                var food_id = doc.data().id;
                let newcard = cardTemplate.content.cloneNode(true);
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = calories;
                newcard.querySelector('a').onclick = () => set_food_data(food_id, title, price);
                document.getElementById("food_container").appendChild(newcard);
            })
        })
}


displayCards("grocery_items");