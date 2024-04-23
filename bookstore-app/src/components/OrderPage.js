import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(''); // Assuming you have a way to obtain the user's ID

  // Fetch all orders for a specific user
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/user/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders for user', error);
      }
    };
    if (userId) {
      fetchUserOrders();
    }
  }, [userId]);

  // Fetch all orders (for admin use perhaps)
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/orders/');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch all orders', error);
    }
  };

  // Create a new order
  const createOrder = async (orderDetails) => {
    try {
      const response = await axios.post('http://localhost:8000/api/order/', orderDetails);
      setOrders([...orders, response.data]); // Add the new order to the current list
    } catch (error) {
      console.error('Failed to create order', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <button onClick={() => fetchAllOrders()}>Fetch All Orders</button>
      {orders.map(order => (
        <div key={order.id}>
          <h3>Order ID: {order.id}</h3>
          <p>Total: ${order.total.toFixed(2)}</p>
          <p>Status: {order.status}</p>
          {/* You can add more details and functionality here */}
        </div>
      ))}
    </div>
  );
}

export default OrderPage;

