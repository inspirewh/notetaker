const router = require('express').Router();
const fs = require('fs');
const { networkInterfaces } = require('os');
const path = require('path'); 
const uuid = require('uuid');

const dbPath = path.join(__dirname, '..', 'db', 'db.json');
function getNotes(){
    //read the content of DB JSON
    const content = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(content) || []; // if content has succesfully been passed return the parse content otherwise return an empty array 

}

function saveNote(title, text){ //consider what is inside each note -- title, text, ID  
    //create a new note instance
    const newNote = {
        id: uuid.v4(), // will generate the id
        title: title,
        text: title,
        
    }

    //add new note data to db.json
    
    //retrieve the existing note data
    const notes = getNotes();
    
    //push new note 
    notes.push(newNote);

    //resave into db.json (convert the notes array into a string)
    fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf-8'); 
    return networkInterfaces;
}

function deleteNote(id){
    //get Notes 
    const notes = getNotes();
    //filter the given ID from note -- filter the notes so title/text go into "filtered" variable and you are left with ID and stored under variable
    const filtered = notes.filter((note) => note.id !== id);
    
    //resave the notes
    fs.writeFileSync(dbPath, JSON.stringify(filtered), 'utf-8'); 
}

// The following API routes should be created (define API End point):

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

router.get('/notes', (req, res) =>{
    const notes = getNotes();
    res.json(notes);
});


// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
router.post('/notes', (req,res) => {
    //create a new note
    const created = saveNote(req.body.title, req.body.text);
    res.json(created);
    
})


// * `DELETE notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
router.delete('/notes/:id', (req,res) =>{
    
    deleteNote(req.params.id);
    
    res.json({
        data: 'ok',
    })
})

module.exports = router;