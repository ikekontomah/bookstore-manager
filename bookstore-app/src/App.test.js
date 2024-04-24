import { render, screen } from '@testing-library/react';
import App from './App';

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});



const setup = (initialRoute = '/') => {
  window.history.pushState({}, 'Test page', initialRoute);
  return render(<App />, { wrapper: Router });
};

describe('Integration Tests', () => {
  test('complete user flow: login, view books, add book to cart', async () => {
    setup('/login');

    // Mock user logging in
    userEvent.type(screen.getByPlaceholderText('Email'), 'user@example.com');
    userEvent.type(screen.getByPlaceholderText('Password'), 'password');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assume login redirects to books page
    await waitFor(() => screen.getByText('Books'));
    expect(screen.getByText('Books')).toBeInTheDocument();

    // Click on 'Add to Cart' for the first book
    userEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    // Check if the cart page shows the item
    setup('/cart');
    expect(await screen.findByText('Book 1')).toBeInTheDocument();
    expect(screen.getByText('Qty: 1')).toBeInTheDocument();
    expect(screen.getByText('Total: $10')).toBeInTheDocument();
  });
});


// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import userEvent from '@testing-library/user-event';
// import App from './App';

// // Helper function to render the component within the Router
// const renderWithRouter = (ui, { route = '/' } = {}) => {
//   window.history.pushState({}, 'Test page', route);
//   return render(ui, { wrapper: Router });
// };

// describe('App component routing', () => {
//   it('should render the home page by default', () => {
//     renderWithRouter(<App />);
//     expect(screen.getByText(/Welcome to Our Bookstore/i)).toBeInTheDocument();
//   });

//   it('should navigate to the login page', () => {
//     renderWithRouter(<App />, { route: '/login' });
//     expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
//   });

//   it('should navigate to the register page', () => {
//     renderWithRouter(<App />, { route: '/register' });
//     expect(screen.getByText(/Register/i)).toBeInTheDocument();
//   });

//   it('should navigate to the books page', () => {
//     renderWithRouter(<App />, { route: '/books' });
//     expect(screen.getByText(/Books/i)).toBeInTheDocument();
//   });

//   it('should navigate to the cart page', () => {
//     renderWithRouter(<App />, { route: '/cart' });
//     expect(screen.getByText(/Shopping Cart/i)).toBeInTheDocument();
//   });

//   it('should navigate to the profile page', () => {
//     renderWithRouter(<App />, { route: '/profile' });
//     expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
//   });

//   it('should navigate to the orders page', () => {
//     renderWithRouter(<App />, { route: '/orders' });
//     expect(screen.getByText(/Orders/i)).toBeInTheDocument();
//   });
// });
