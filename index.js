require('dotenv').config()
const express = require('express');
const massive = require('massive');

const {create, getAll, getOne, deleteProduct, update} = require('./productsController.js');


const app = express();
const {CONNECTION_STRING } = process.env;

app.use(express.json());

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("database connected")
  })
  .catch(err => console.log(err));

app.post('/api/products', create);
app.get('/api/products', getAll);
app.get('/api/products/:id', getOne);
app.put('/api/products/:id', update);
app.delete('/api/products/:id', deleteProduct);

app.listen(3000, () => {
    console.log(`Server listening on port 3000.`);
  });

