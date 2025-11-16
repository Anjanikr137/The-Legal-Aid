const express = require('express');
const path = require('path');
const fs = require('fs'); // This line is required
const app = express();
const port = 3000;

// --- 1. EJS and View Engine Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --- 2. Static Files Setup ---
app.use(express.static(path.join(__dirname, 'assets')));

// --- 3. Body Parser (for form data) ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- 4. Page Routes ---

app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome' });
});

app.get('/home', (req, res) => {
    res.render('home', { title: 'Home', cssFile: 'home.css' });
});

app.get('/about-us', (req, res) => {
    res.render('About_us', { title: 'About Us', cssFile: 'About-us.css' });
});

app.get('/contact', (req, res) => {
    res.render('Contact', { title: 'Contact Us', cssFile: 'Contact.css' });
});

// --- THIS IS THE FIXED ROUTE ---
app.get('/find-lawyers', (req, res) => {
    
    // This console log will prove the new code is running
    console.log("--- Loading /find-lawyers route (NEW VERSION) ---");

    const jsonPath = path.join(__dirname, 'json', 'lawyers.json');

    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Could not read lawyers.json:", err);
            res.render('find-lawyers', { 
                title: 'Find a Lawyer', 
                cssFile: 'findlawyers.css', 
                lawyers: [] // Send an empty array on error
            });
            return;
        }

        const lawyersData = JSON.parse(data);

        // This line sends your 'lawyers' array to the EJS file
        res.render('find-lawyers', { 
            title: 'Find a Lawyer', 
            cssFile: 'findlawyers.css', 
            lawyers: lawyersData.lawyers 
        });
    });
});
// --- END OF FIXED ROUTE ---

app.get('/signin', (req, res) => {
    res.render('signin', { title: 'Sign In', cssFile: 'signin.css' });
});

// --- Special Routes ---
app.get('/track-case', (req, res) => {
    res.render('Track-Case', { title: 'Track Your Case' });
});

app.get('/submit-case', (req, res) => {
    res.render('submit-case', { title: 'Submit Your Case' });
});

app.get('/dashboard', (req, res) => {
    res.render('Dashboard', { title: 'Your Dashboard' });
});

// --- Form ---
app.post('/submit-case', (req, res) => {
    console.log(req.body); 
    res.redirect('/home');
});

// --- Server ---
app.listen(port, () => {
    console.log(`LegalAid Pro server is running on http://localhost:${port}`);
});