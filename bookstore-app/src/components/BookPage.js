import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookPage({ onAddToCart }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await axios.get('https://yourapi.com/books');
      setBooks(result.data);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      {books.map(book => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <button onClick={() => onAddToCart(book)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default BookPage;
