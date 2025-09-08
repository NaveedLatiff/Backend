const express = require('express');
const app = express();

// // Middleware to read form data
app.use(express.urlencoded({ extended: true }));

let username = null

app.get('/', (req, res, next) => {
    res.send(`<form action='/submit' method='POST'>
        <input name="username" type="text" placeholder="Enter your First Name"/>
        <button>Submit</button>
        </form>
        ${username ? `<p>Your username is ${username}</p>` : ""}
        `);
});

app.post('/submit', (req, res, next) => {
    username = req.body.username;
    res.redirect('/')
});
app.get('/submit', (req, res) => {
    res.redirect('/')
})


// Catch-all middleware for unknown routes
app.use((req, res) => {
    res.status(404).send("Page Not Found")
})

app.listen(3000, () => {
    console.log(`http://localhost:3000`);
});