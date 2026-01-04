import faker from 'faker';

let products = '';

for (let i = 0; i < 10; i++) {
  products += `<div>
    <h2>${faker.commerce.productName()}</h2>
    <p>${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.product()}</p>
    <strong>$${faker.commerce.price()}</strong>
  </div>`;
}
console.log(products);

document.querySelector('#product-list').innerHTML = products;