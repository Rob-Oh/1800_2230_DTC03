
//------------------------------------------------------
// Get data from a CSV file with ".fetch()"
// Since this file is local, you must use "live serve"
//------------------------------------------------------
async function getCSVdata() {
    const response = await fetch('./foods.csv'); //send get request
    const data = await response.text();      //get file response
    const list = data.split('\r\n').slice(1);  //get line
    list.length = 10
    list.forEach(row => {
        const columns = row.split(',');
        const id = columns[0];
        const name = columns[1];
        const calories = columns[2];
        console.log(name)
        console.log(id)
        console.log(calories)
        db.collection("food_items").add({   //write to firestore
            id: id,
            name: name,
            calories: calories
        })

    })
}

// getCSVdata()

