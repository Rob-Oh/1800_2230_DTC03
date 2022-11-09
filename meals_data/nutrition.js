
//------------------------------------------------------
// Get data from a CSV file with ".fetch()"
// Since this file is local, you must use "live serve"
//------------------------------------------------------
async function getCSVdata() {
    const response = await fetch('./foods.csv'); //send get request
    const data = await response.text();      //get file response
    const list = data.split('\n').slice(1);  //get line
    list.length = 10
    list.forEach(row => {
        const columns = row.split(','); //get token 
        const id = columns[0];     //country name
        const name = columns[1];        //gold medals
        const calories = columns[2];
        console.log(name)
        db.collection("food_items").add({   //write to firestore
            id: id,
            name: name,
            calories: calories
        })

    })
}

// getCSVdata()

