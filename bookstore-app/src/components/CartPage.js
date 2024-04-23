import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from the backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/cart/');
        setCartItems(response.data);
      } catch (error) {
        console.error('Failed to fetch cart items', error);
      }
    };
    fetchCartItems();
  }, []);

  // Add item to the cart
  const handleAddToCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:8080/api/cart/add/', item);
      setCartItems(response.data); // Assuming API returns the updated cart
    } catch (error) {
      console.error('Failed to add item to cart', error);
    }
  };

  // Remove item from the cart
  const handleRemoveFromCart = async (item) => {
    try {
      const response = await axios.post('http://localhost:8080/api//cart/remove', { id: item.id });
      setCartItems(response.data); // Assume API returns the updated cart
    } catch (error) {
      console.error('Failed to remove item from cart', error);
    }
  };

  // Empty the cart
  const handleEmptyCart = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/cart/empty');
      setCartItems([]); // Empty the cart in the client
    } catch (error) {
      console.error('Failed to empty the cart', error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 && <div>Cart is empty</div>}
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <div>
            <button onClick={() => handleRemoveFromCart(item)}>-</button>
            <span>{item.qty}</span>
            <button onClick={() => handleAddToCart(item)}>+</button>
          </div>
          <span>${item.price}</span>
        </div>
      ))}
      <div>Total: ${totalPrice.toFixed(2)}</div>
      <button onClick={handleEmptyCart}>Empty Cart</button>
    </div>
  );
}

export default CartPage;
