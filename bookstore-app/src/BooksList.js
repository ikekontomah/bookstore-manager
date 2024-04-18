import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BooksList() {
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
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}

export default BooksList;
