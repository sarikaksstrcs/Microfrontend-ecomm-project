import faker from 'faker';

let cartItems = '';

for (let i = 0; i < 5; i++) {
  cartItems += `<div>
    <h2>${faker.commerce.productName()}</h2>
    <p>Quantity: ${Math.floor(Math.random() * 5) + 1}</p>
    <strong>$${faker.commerce.price()}</strong>
  </div>`;
}
console.log(cartItems);

document.querySelector('#cart-list').innerHTML = cartItems;