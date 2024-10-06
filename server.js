const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route for homepage (index.html)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Route to handle Sign In form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    console.log(`Name: ${name}, Password: ${email}`);
    res.send(`Thank you for signing in, ${name}!`);
});

// Route to handle Sign Up form submission
app.post('/signup', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Validate passwords match
    if (password === confirmPassword) {
        console.log(`Name: ${name}, Email: ${email}, Password: ${password}`);
        res.send(`Thank you for signing up, ${name}!`);
    } else {
        res.status(400).send('Passwords do not match!');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
