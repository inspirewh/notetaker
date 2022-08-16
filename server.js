const express = require('express');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 3001;

const app = express();

//load the web routes 
app.use(webRoutes);
// The following API routes should be created:

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).


// ## Bonus

// You haven’t learned how to handle DELETE requests, but this application offers that functionality on the front end. As a bonus, try to add the DELETE route to the application using the following guideline:

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.


app.get("*", (req, res) => {
    res.status(404).send('page not found');
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
})