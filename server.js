const express = require('express');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const PORT = process.env.PORT || 3001;

const app = express();

//server is unable to "serve" the css file need to add static folder. This makes the public folder visable to the public
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//load the web routes 
app.use(webRoutes);
app.use('/api', apiRoutes);


app.get("*", (req, res) => {
    res.status(404).send('page not found');
})

app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
})