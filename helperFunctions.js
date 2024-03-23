export function validateForm(){
    const name = document.forms.card.name.value;
    const cardNumber = document.forms.card.cardNumber.value;
    const cardCvv = document.forms.card.cardCvv.value;
     
    let missingMsg = 'Please enter your';
     if (name === "") { 
        window.alert 
            (`${missingMsg} name`); 
         
        return false; 
    } 

    const regex = new RegExp('^[0-9]{13,19}$');
    if(cardNumber === "" || isNaN(cardNumber) || !regex.test(cardNumber)) {
        window.alert
            (`${missingMsg} valid 13 digit card number`);
            return false;
    } 
  
    const regex2 = new RegExp('^[0-9]{3,4}$');
    if(cardCvv === "" || isNaN(cardCvv) || !regex2.test(cardCvv)) {
        window.alert
            (`${missingMsg} your 3 or 4 digit card security code located on the back of your card`);
            return false;
    }
    
    console.log(name);
    return true;
}

export function calculateTotalCost(itemArr){
    
    const totalCost = itemArr.reduce((total, currentItem) => total + currentItem.price, 0)
    
    return totalCost
}

// Adds up item cost if two items are the same, shows on same line, adding cost to the right, WIP
export function totalItemPrice(ocurrences, addedItem){
    
    let allItems = [];
    let price = {};
      
     addedItem.forEach((item) => {
        for(let [key, value] of Object.entries(ocurrences)){
            if(key === item.name){
            
                const totalPrice = value > 0 ? item.price * value : item.price;
                price = {};
                    price[`"${item.name}": "${price}"`]

                allItems.push(price)
                
            }
        }
     })
     
     return allItems;
 
}



// function countItemOcurrences(itemArr){
//     // if(itemArr.length === 1){
//     //     return itemArr;
//     // }
//     let items = { };
//     let count = { };
//     let fun = []
    
//     for(let food of itemArr){
        
//         if(count[food.name]){
//             // count[food.name] += 1;
//             items = {name: food.name, id: food.id, price: food.price, count: count[food.name] += 1} 
//         } else {
//             // count[food.name] = 1;
//             items = {name: food.name, id: food.id, price: food.price, count: count[food.name] = 1}
            
//         }
//         fun.push(items);
//     }
//     // console.log(JSON.stringify(items), 'checking for understanding, occurs exist?')
//     return fun;
// }




/* Experiment code to refactor app after mvp





// function matchAll() {
//   var arr = [
//       {"name": "Pizza","ingredients":["pepperoni","mushrom","mozarella"],"price":14,"emoji":"🍕","id":0},
//       {"name":"Pizza","ingredients":["pepperoni","mushrom","mozarella"],"price":14,"emoji":"🍕","id":0},
//       {"name":"Hamburger","ingredients":["beef","cheese","lettuce"],"price":12,"emoji":"🍔","id":1},{"name":"Beer","ingredients":["grain, hops, yeast, water"],"price":12,"emoji":"🍺","id":2}
//       ];

// for(let food of arr){
//     const regex = /\b(Pizza|Beer|Hamburger)\b/g
//     let res = food.name.match(regex);
//    let count = 0;
//    switch(res){
//        case 'Pizza':
//         ;
//        case 'Beer':
//        case 'Hamburger'
//    }
    // const foundMatches = res ? res.length : 0;
    // console.log(foundMatches)
// }
// }

  

// var found = matchAll();

// console.log(found);

 
// function addUp(){
  
//     const foods = [{"name": "pizza", id:1, "price": 5}, {"name": "beer", id:2, "price": 5}, {"name":"hotdog", "id": 3, "price": 3}]
    
//     foods.push({"name": "pizza", id:1, "price": 5})
//     foods.push({"name": "beer", id:2, "price": 5})
//     foods.push({"name": "beer", id:2, "price": 5})
//     // output after counting pizza 2, beer 3, hotdog 1
//     // console.log(food)
//     const count = {};
    
//     for(let item of foods){
//         if(count[item.name]){
//             count[item.name] += 1;
//         } else{
//             count[item.name] = 1;
//         }
//     }
    
//     console.log(JSON.stringify(count));
//     console.log('hello')
    
//     const totalFoodCost = foods.reduce((total, currentItem)=> total + currentItem.price, 0) // total of food calculations

  
 
//   console.log(totalFoodCost)
// }

// console.log(addUp())




// function displayMessage(item) {
//     const displayMsg = document.getElementById("display")
//     let message = '';
//     const foodName = JSON.stringify(item.name);
    
//     message = `<p>${foodName} has been added to your cart!</p>`
//     displayMsg.innerHTML += message;
    
//     // setTimeout(function(){
        
//     // })
// //     document.getElementById("alarmmsg").innerHTML = msg;

// setTimeout(function(){
//      displayMsg.textContent = '';
// }, 3000); // <--- removes the whole thing

//     return message;
   
// }
*/