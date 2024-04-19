import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await axios.get('https://yourapi.com/orders');
      setOrders(result.data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Total: ${order.total}</p>
          {/* Further details can be expanded here */}
        </div>
      ))}
    </div>
  );
}

export default OrderPage;
