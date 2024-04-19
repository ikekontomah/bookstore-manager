import React from 'react';

function CartPage({ cartItems, onAddToCart, onRemoveFromCart }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 && <div>Cart is empty</div>}
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <div>
            <button onClick={() => onRemoveFromCart(item)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => onAddToCart(item)}>+</button>
          </div>
          <span>${item.price}</span>
        </div>
      ))}
      <div>Total: ${totalPrice.toFixed(2)}</div>
    </div>
  );
}

export default CartPage;
