// cart/src/index.js
import faker from 'faker';

let cartItems = '';

  cartItems += `
<h1>My Cart Item</h1>
<div>
    <h2>5 products</h2
  </div>`;

console.log(cartItems);

document.querySelector('#cart-list').innerHTML = cartItems;