import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookPage() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm]); // Re-fetch books when searchTerm changes

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/book/search/`);
      setBooks(response.data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const fetchBookDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/book/${id}/`);
      setSelectedBook(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Failed to fetch book details:', error);
    }
  };

  const addBook = async (book) => {
    try {
      const response = await axios.post('http://localhost:8080/api/book/', book);
      setBooks([...books, response.data]); // Assuming the API returns the added book
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  const updateBook = async (book) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/book/${book.id}/`, book);
      setBooks(books.map(b => b.id === book.id ? response.data : b)); // Assuming the API returns the updated book
    } catch (error) {
      console.error('Failed to update book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/book/${id}/`);
      setBooks(books.filter(b => b.id !== id));
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  return (
    <div>
      <h2>Books</h2>
      <input
        type="text"
        placeholder="Search by title, author, or genre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {books.map(book => (
        <div key={book.id}>
          <h3 onClick={() => fetchBookDetails(book.id)}>{book.title}</h3>
          <p>Author: {book.author}</p>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
          <button onClick={() => {
            setSelectedBook(book);
            setEditing(true);
          }}>Edit</button>
        </div>
      ))}
      {editing && selectedBook && (
        <div>
          <input type="text" value={selectedBook.title} onChange={e => setSelectedBook({...selectedBook, title: e.target.value})} />
          <input type="text" value={selectedBook.author} onChange={e => setSelectedBook({...selectedBook, author: e.target.value})} />
          <input type="text" value={selectedBook.genre} onChange={e => setSelectedBook({...selectedBook, genre: e.target.value})} />
          <button onClick={() => updateBook(selectedBook)}>Update Book</button>
        </div>
      )}
    </div>
  );
}

export default BookPage;





