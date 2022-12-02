function insert_balance(){
    // to check if the user is logged in:
     firebase.auth().onAuthStateChanged(user =>{
         if (user){
             console.log(user.uid); // let me to know who is the user that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
            currentUser.get().then(userDoc=>{
                //get the user name
                var user_balance = userDoc.data().balance;
                var user_net_budget = userDoc.data().net_budget;
                var percentage = Math.floor(user_balance/user_net_budget*100)
                console.log(user_balance);
                $("#balance-goes-here").text(user_balance); //jquery
                $("#net_budget-goes-here").text(user_net_budget);
                $('.progress-bar').css('width', percentage+'%').attr('aria-valuenow', percentage);
                // document.getElementByID("name-goes-here").innetText=user_Name;
            })    
        }
    
     })
    }
insert_balance();

// function populate_progress_bar() {
//     firebase.auth().onAuthStateChanged(user => {
//         var currentUser = db.collection("users").doc(user.uid)
//         currentUser.get().then(user_doc => {
//             var balance = user_doc.data().balance
//             var net_budget = user_doc.data().net_budget
//             document.getElementById("balance-goes-here").innerHTML = balance
//             document.getElementById("net_budget-goes-here").innerHTML = net_budget
//             console.log(user_doc)
//         })
//     })

// }

// populate_progress_bar()

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        food_amount = document.getElementById('data_input').value;     //get the value of the field with id="schoolInput"
        currentUser.update({
            food_amount: food_amount
        })
            .then(() => {
                console.log("Document successfully updated!");
                setTimeout(window.location.reload(), 1200)
            })
    }
    )
}


function clear_item() {
    firebase.auth().onAuthStateChanged(user => {
        var currentUser = db.collection("users").doc(user.uid)
        food_amount = document.getElementById('data_input').value;     //get the value of the field with id="schoolInput"
        currentUser.update({
            food_amount: 0
        })
            .then(() => {
                console.log("Document successfully updated!");
                setTimeout(window.location.reload(), 1200)
            })
    }
    )
}


// function populate_span() {
//     firebase.auth().onAuthStateChanged(user => {
//         var currentUser = db.collection("users").doc(user.uid)
//         currentUser.get().then(user_doc => {
//             var food_amount = user_doc.data().food_amount
//             document.getElementById("amount").innerHTML = food_amount
//             console.log(user_doc)
//         })
//     })

// }


// populate_span()
