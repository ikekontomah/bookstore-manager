import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Our Bookstore</h1>
      <p>Browse our extensive collection of books across various genres. Add your favorites to the cart and enjoy a seamless checkout process!</p>
      <nav>
        <ul>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/cart">Shopping Cart</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
