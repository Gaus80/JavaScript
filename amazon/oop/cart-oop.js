function generateCart(localKey){
    let cart = {
    cartItems: undefined,
     
   loadFromStorage:  function (){
        this.cartItems = JSON.parse(localStorage.getItem(localKey));
        if(!this.cartItems){
      
          this.cartItems =  [{
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity:1,
            deliveryOptionId :'1'
        },
        {
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity:2,
            deliveryOptionId :'2'
        }];
        }         
      },

      saveLocalStorage(){
        localStorage.setItem(localKey, JSON.stringify(this.cartItems))
      },

     addToCart(productId,cantidad=1){

        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            matchingItem = cartItem;
          }
        });
      
        if (matchingItem) {
          matchingItem.quantity += 1;
        } 
        else {
          this.cartItems.push({
            productId: productId,
            quantity: cantidad,
            deliveryOptionId:'1'
          })
        }
      
        this.saveLocalStorage();
      },

      removeFromCart(productId){
        const newCart = [];
        
        this.cartItems.forEach((cartItem) => {
          if(productId !== cartItem.productId){
            newCart.push(cartItem);
          }
        })
      
        cart = newCart;
      
        this.saveLocalStorage();
      },
      
      updateDeliveryOption (productId,deliveryOptionId){
  
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId) {
            matchingItem = cartItem;
          }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveLocalStorage();
      }
};
return cart;
}

const cart = generateCart('cart-oop');
cart.loadFromStorage();
cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d')
console.log(cart);

const businessCart = generateCart('cart-business');
businessCart.loadFromStorage();
console.log(businessCart);