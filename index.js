import { menuArray } from './data.js';
import { validateForm, calculateTotalCost } from './helperFunctions.js';

let menuItems = [];
let total;

const addToCheckout = document.getElementById('precheckout');

document.addEventListener('click', (e) => {
  const modal = document.getElementById('pop-up');

  if (e.target.id === 'add-btn') {
    const foodDataset = e.target.dataset.food;

    const targetItem = handleAddFoodItem(foodDataset);
    menuItems.push(targetItem); // push to

    handlePreCheckout(menuItems);

  } else if (e.target.id === 'checkout-btn') {
    handleCompleteOrderBtn(e, modal);

  } else if (e.target.dataset.remove) {
    handleRemoveItem(e.target.dataset.remove);

  } else if (e.target.id === 'close') {
    handleCloseBox(modal);

  } else if (e.target.id === 'payBtn') {
    handlePayment(e, modal);

  } else if (e.target.id === 'close-box') {

    const thankYouModal = document.querySelector('.orderCompleteMsg');
    handleCloseBox(thankYouModal);
  }
});

function handleAddFoodItem(foodId) { // index
  const targetBtn = menuArray.filter((menuItem) => menuItem.id.toString() === foodId)[0];

  return targetBtn;
}

function handleCompleteOrderBtn(e, modal) {
  e.preventDefault();

  modal.style.display = 'flex';
}

function handleCloseBox(box) {
  box.style.display = 'none';
}

function handlePayment(e, modal) {
  e.preventDefault();

  const form = document.getElementById('card');
  const paymentForm = new FormData(form);
  const clientName = paymentForm.get('name');

  const isValid = validateForm();

  const formBtn = document.getElementById('payBtn');

  let isDisabled = formBtn.getAttribute('aria-disabled') === 'true';

  if (isDisabled && !isValid) {
    return;
  }

  if (isValid) {
    modal.style.display = 'none';
    isDisabled = 'false';

    const boughtItemsMsg = `
                            <div class="orderCompleteMsg">
                                <span id="close-box" class="close-box" data="close">&times;</span>
                                <h1>Thanks, ${clientName}. Your order is on it's way!</h1>
                                <hr/>
                            </div>
                                `;
    // WIP
    //    <h3>Rate your experience:
    //         <i id="star-1" class="fa-regular fa-star"></i>
    //     </h3>
    addToCheckout.innerHTML = boughtItemsMsg;
  }

  menuItems = [];
  form.reset();
}

function handleRemoveItem(itemId) {
  let orderItemHtml = '<h1 class="preCheckoutOrder">Your Order</h1>';

  menuItems.splice(itemId, 1);

  total = calculateTotalCost(menuItems);

  menuItems.forEach((item, index) => {
    orderItemHtml += `<div class="preCheckout">
                                    <p>${item.name}<span id="remove" class="preCheckout-remove" data-remove=${index}>remove</span></p>
                                    <p>$${item.price}</p>
                              </div>`;
  });

  orderItemHtml += '<hr class="hr-total"/>';

  orderItemHtml += `<div class="preCheckout">
                                <h2>Total price</h2>
                                <h5>$${total}</p>
                              </div>
                    <button id="checkout-btn" class="checkout-btn">complete order</button>
                `;

  addToCheckout.innerHTML = orderItemHtml;

  if (menuItems.length === 0) {
    addToCheckout.innerHTML = '';
  }
}

function handlePreCheckout(addedItems) {
  let addFood = '';

  const newDiv = document.createElement('div');
  newDiv.className = 'order-details';

  if (addedItems.length > 0) {
    // console.log(JSON.stringify(addedItems), addedItems.length)
    //     const ocurrences = countItemOcurrences(addedItem);
    //    console.log(ocurrences.name)
    // const itemPrice = totalItemPrice(ocurrences, addedItem);
    // console.log(ocurrences)

    total = calculateTotalCost(addedItems);

    addFood = '<h1 class="preCheckoutOrder">Your Order</h1>';

    addedItems.forEach((item, index) => {
      addFood += `<div class="preCheckout">
                    <p>${item.name}<span id="remove" class="preCheckout-remove" data-remove=${index}>remove</span></p>
                    <p>$${item.price}</p>
                </div>`;
    });

    addFood += '<hr class="hr-total"/>';
    addFood += `<div class="preCheckout">
                    <h2>Total price</h2>
                    <h5>$${total}</p>
                </div>
                <button id="checkout-btn" class="checkout-btn">complete order</button>
                `;
  }

  addToCheckout.innerHTML = addFood;

  return addFood;
}


// function countItems(item) {
//   menuItems.forEach(food => {
//     if (food.id === item.id) {
      
//     }
//   })
// }

function fetchData() {
  let products = '';
  
  menuArray.forEach((item) => {
    const {
      name, ingredients, id, price, emoji,
    } = item;

    const list = ingredients.join(', ');
    const fullPrice = `$${price}`;

    products += `<div class="flex" style="padding-top: 15px">
                    <div><span class="emoji">${emoji}</span></div>
                    <div class="ingredients" >
                        <h2>${name}</h2>
                        <p>${list}</p>
                        <h5>${fullPrice}</h5>
                    </div>
                  <button id="add-btn" class="add-btn" data-food=${id}> 
                   +
                  </button>
                </div>
                <div class="hr-space"><hr /></div>`;
    
    return products
  });

  return products;
}

function render() {
  document.getElementById('content').innerHTML = fetchData();
}

render();
