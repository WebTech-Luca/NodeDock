import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', description: '', author: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3002/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des livres :( :', error);
    }
  };

  const handleInputChange = (e) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = async () => {
    try {
      await axios.post('http://localhost:3002/books', newBook);
      setNewBook({ title: '', description: '', author: '' });
      fetchBooks(); 
    } catch (error) {
      console.error('Erreur lors de l\'ajout du livre:( :', error);
    }
  };

  return (
    <div>
      <h1>Liste des Livres</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <strong>{book.title}</strong> - {book.author}
            <p>{book.description}</p>
          </li>
        ))}
      </ul>

      <h2>Ajouter un Livre</h2>
      <div>
        <label>Titre:</label>
        <input
          type="text"
          name="title"
          value={newBook.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={newBook.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Auteur:</label>
        <input
          type="text"
          name="author"
          value={newBook.author}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleAddBook}>Ajouter</button>
    </div>
  );
};

export default App;
