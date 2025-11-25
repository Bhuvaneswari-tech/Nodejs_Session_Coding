//Cart operations
export function addToCart(cart,product){
    cart.push(product)
    return cart
}

export function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price, 0);
}