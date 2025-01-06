export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){

  cart =  [{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:3,
    deliveryOptionId :'1'
},
{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:2,
    deliveryOptionId :'2'
}];
}
  
  
 
function saveLocalStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

//AÑADIR ELEMENTOS AL CARRO

export function addToCart(productId,cantidad){

  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } 
  else {
    cart.push({
      productId: productId,
      quantity: cantidad,
      deliveryOptionId:'1'
    })
  }

  saveLocalStorage();
}

export function removeFromCart(productId){
  const newCart = [];
  
  cart.forEach((cartItem) => {
    if(productId !== cartItem.productId){
      newCart.push(cartItem);
    }
  })

  cart = newCart;

  saveLocalStorage();
} 

export function updateDeliveryOption (productId,deliveryOptionId){
  
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
matchingItem.deliveryOptionId = deliveryOptionId;
saveLocalStorage();
}