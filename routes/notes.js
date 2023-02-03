const notesR = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const db = ('./db/db.json');

notesR.get('/', (req, res) => {
  console.log(`${req.method} received for notes.`)
  readFromFile(db).then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notesR.post('/', (req, res) => {
  console.log(`${req.method} received for notes.`);

  const {title, text } = req.body;

  if (req.body) {
    const newNote = {
      title, 
      text,
      id: uuidv4(),
    };
    fs.readFile(db, 'utf-8', (err, data)=>{
      if (err) {
        console.log(`There is a ${err} error!`);
      } else {
        const newData = JSON.parse(data);
        newData.push(newNote);
        res.json(newData);
        fs.writeFile(db, JSON.stringify(newData, null, 4), (err, data)=> {
          if (err) {
            console.log(`There is a ${err} error!`);
          } else {
            console.log(`Note written to the ${db} file.`)
          }
        });
      }
    });
  };
});

notesR.delete('/:id', (req, res)=> {
  const noteID = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      
      const response = json.filter((notes) => notes.id !== noteID);
    
      fs.writeFile(db, JSON.stringify(response, null, 4), (err)=> {
        if (err) {
          console.log(`There is a ${err} error!`);
        } else {
          console.log(`Note has been deleted from ${db} file.`)
        }
      });
    });
});

module.exports = notesR;


