import {cart,removeFromCart, updateDeliveryOption} from '../../data/cart.js'
import {  getProduct } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

// //USAR DAYJS() PARA MANIPULAR FECHAS Y TIEMPO
// const dia = dayjs();
// const deleiveryDay = dia.add(7,'day');
// const formatoFecha = deleiveryDay.format('dddd,MMMM,D');
// console.log(formatoFecha)


export function renderOrderSummary(){
  let cartSummaryHTML ='';

  cart.forEach((cartItem)=>{
      const productId = cartItem.productId;
      const matchingItem = getProduct(productId);

   
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);

     

      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days');
      const date = deliveryDate.format('dddd, MMMM D');

      cartSummaryHTML += `
          <div class="cart-item-container 
          js-cart-item-container
          js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${date}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingItem.name}
                </div>
                <div class="product-price">
                ${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity
                js-product-quantity-${matchingItem.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                   js-delete-link
                   js-delete-link-${matchingItem.id}"
                   data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>
                <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingItem,cartItem)}
              </div>
            </div>
          </div>`;
      });

  document.querySelector(".js-checkout-summary").
  innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").
  forEach((link) => {
      link.addEventListener('click',() => {
          const productId = link.dataset.productId;
          removeFromCart(productId);
          const container = document.querySelector(
              `.js-cart-item-container-${productId}`);
        container.remove();
        renderPaymentSummary();
      });
  });

  function deliveryOptionHTML(matchingItem,cartItem){
    
    let html ='';

    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOption.deliveryDays,
          'days');
        const date = deliveryDate.format('dddd, MMMM D');

      const price = deliveryOption.priceCents === 0 ?
        "FREE": formatCurrency(deliveryOption.priceCents);

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html +=   `
                  <div class="delivery-option js-delivery-option"
                  data-product-id ="${matchingItem.id}" 
                  data-delivery-option-id ="${ deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${date}
                      </div>
                      <div class="delivery-option-price">
                        ${price} - Shipping
                      </div>
                    </div>
                  </div>
              
      `
    })
    return html
  }

  document.querySelectorAll(".js-delivery-option").
  forEach((input) => {
    input.addEventListener('click',() =>{
      const {productId, deliveryOptionId} = input.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}

