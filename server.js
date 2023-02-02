const express = require('express');
const path = require('path');
const api = require('./Develop/routes/index');

const PORT = process.env.PORT || 3001;
const app = express();

//middleware for the app
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/api', api);
app.use(express.static('public'));

//get requests
app.get('/', (req, res)=> 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res)=> 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//get request to return to index.html if there is an invalid request.
app.get('*', (req, res)=> 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, ()=> 
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);