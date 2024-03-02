const express = require('express');
const app = express();
// app.use(express.json());
// const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost:27017/nextu?retryWrites=true&w=majority',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log("MongoDB connected"))
//     .catch(() => console.log("MongoDB disconnected"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose')
const host = process.env.HOSTDB || '127.0.0.1';
const dbport = process.env.DBPORT || '27017';
console.log(host);
console.log(dbport);
const url = `mongodb://${host}:${dbport}/nextu`;
console.log(url);
mongoose.connect(`mongodb://${host}:${dbport}/nextu`)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// mongoose.connect('mongodb+srv://erwan-hamza:NjfoSJFW3rBjYtcQ@cluster0.utebqfc.mongodb.net/nextu?retryWrites=true&w=majority')
//   .then(() => console.log("Connexion à MongoDB réussie !"))
//   .catch(() => console.log("Connexion à MongoDB échouée !"));
const Books = require('./models/book');
app.post('/books', (req, res)=>{
  console.log(req.body);
const book = new Books({
  ...req.body
});
book.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }));
});

app.get('/books', async (req, res) => {
  try {
    const books = await Books.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  app.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const result = await Books.findById(bookId);
      if (result) {
        res.json(result);
      } else {
        res.status(404).send('perdu looser');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  });
  app.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
  
    try {
      const result = await Books.findByIdAndUpdate(bookId, updatedBook);
      if (result) {
        res.send('Bien joué mon lutin');
      } else {
        res.status(404).send('perdu looser');
      }
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  });

  app.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;
  
    try {
      const result = await Books.findByIdAndDelete(bookId);
      if (result) {
        res.send('Bravo ma biche');
      } else {
        res.status(404).send('Retry ma biche');
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = app;