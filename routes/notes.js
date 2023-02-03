const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const db = ('./db/db.json');

notes.get('/', (req, res) => {
  console.log(`${req.method} received for notes.`)
  readFromFile(db).then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(`${req.method} received for notes.`);

  const {title, text } = req.body;

  if (req.body) {
    const newNote = {
      title, 
      text,
      note_id: uuidv4(),
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

module.exports = notes;


