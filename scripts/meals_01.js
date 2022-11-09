function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;        // get value of the "name" key
                var calories = doc.data().calories;   // get value of the "details" key
                var hikeID = doc.data().id; //gets the unique CODE field
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = calories;
                newcard.querySelector('a').onclick = () => set_food_data(hikeID, title, calories);//equiv getElementByTagName

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById("food_container").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}


displayCards("food_items");