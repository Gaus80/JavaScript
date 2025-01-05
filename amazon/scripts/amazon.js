//EL ARREGLO DE PRODUCTOS SE CARGA DESDE EL HTML
import {cart} from '../data/cart.js';
import {products} from '../data/products.js'

let productsHTML = '';

products.forEach((product) => {

  productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          $${(product.priceCents / 100.).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-value-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-button" data-product-id ="${product.id}">
            Add to Cart
          </button>
        </div>`
});

document.querySelector('.js-script-products').innerHTML = productsHTML;
document.querySelectorAll('.js-button').forEach((button, product) => {
  button.addEventListener("click", () => {

    const car = document.querySelector(".js-car-quantity");
    const productId = button.dataset.productId;
    let matchingItem;
    
    //AÑADIR ELEMENTOS AL CARRO
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1
      })
    }
    //MOSTRAR EN EL CARRO LA CANTIDAD DE ELEMENTOS
    let carQuantity = 0;
    cart.forEach((item) => {
      carQuantity += item.quantity;
    })
    car.textContent = carQuantity;
    const cantidad = document.querySelector(`.js-value-${product.id}`).value;
    console.log(cantidad)
  })
})

