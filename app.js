require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // New package
const app = express();
const port = process.env.PORT || 3000;

const Case = require('./models/Case');
const Lawyer = require('./models/Lawyer');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- Middleware ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // Enable cookies

// --- Page Routes ---
app.get('/', (req, res) => res.render('index', { title: 'Welcome' }));
app.get('/home', (req, res) => res.render('home', { title: 'Home', cssFile: 'home.css' }));
app.get('/about-us', (req, res) => res.render('About_us', { title: 'About Us', cssFile: 'About-us.css' }));
app.get('/contact', (req, res) => res.render('Contact', { title: 'Contact Us', cssFile: 'Contact.css' }));
app.get('/track-case', (req, res) => res.render('Track-Case', { title: 'Track Your Case' }));
app.get('/submit-case', (req, res) => res.render('submit-case', { title: 'Submit Your Case' }));

// --- 1. LOGIN LOGIC (Set Cookie) ---
app.get('/signin', (req, res) => {
    res.render('signin', { title: 'Sign In', cssFile: 'signin.css' });
});

app.post('/login', (req, res) => {
    // Simulating login by saving email in a cookie
    const userEmail = req.body.email;
    res.cookie('userEmail', userEmail); 
    res.redirect('/dashboard');
});

// --- READ: Find Lawyers (With Auto-Seeding) ---
app.get('/find-lawyers', async (req, res) => {
    try {
        const count = await Lawyer.countDocuments();
        if (count === 0) {
            const jsonPath = path.join(__dirname, 'json', 'lawyers.json');
            if (fs.existsSync(jsonPath)) {
                const fileData = fs.readFileSync(jsonPath, 'utf8');
                const jsonData = JSON.parse(fileData);
                if (jsonData.lawyers) {
                    await Lawyer.insertMany(jsonData.lawyers);
                }
            }
        }
        const lawyers = await Lawyer.find({});
        res.render('find-lawyers', { title: 'Find a Lawyer', cssFile: 'findlawyers.css', lawyers: lawyers });
    } catch (err) {
        console.error(err);
        res.render('find-lawyers', { title: 'Error', cssFile: 'findlawyers.css', lawyers: [] });
    }
});


// --- 2. CREATE CASE (Auto-Login & Redirect to Dashboard) ---
app.post('/submit-case', async (req, res) => {
    try {
        const newCase = new Case(req.body);
        
        // Auto-login the user by setting the cookie
        res.cookie('userEmail', req.body.email); 
        
        await newCase.save();
        console.log('✅ New Case Saved for:', req.body.email);
        
        // Redirect to Dashboard instead of Home
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.send("Error submitting case.");
    }
});


// --- 3. DASHBOARD LOGIC (Filter by User) ---
app.get('/dashboard', async (req, res) => {
    try {
        const userEmail = req.cookies.userEmail; // Get email from cookie

        if (!userEmail) {
            return res.redirect('/signin'); // Force login if no cookie
        }

        // Only find cases that match this email
        const cases = await Case.find({ email: userEmail }).sort({ createdAt: -1 });
        const lawyers = await Lawyer.find().limit(3);
        
        res.render('Dashboard', { 
            title: 'Your Dashboard', 
            cases: cases,
            lawyers: lawyers,
            userEmail: userEmail 
        });
    } catch (err) {
        console.error(err);
        res.redirect('/home');
    }
});


// --- 4. MEETING LOGIC (Increase Progress) ---
app.post('/add-meeting/:id', async (req, res) => {
    try {
        const myCase = await Case.findById(req.params.id);
        
        // Logic: 20% start + (10% per meeting)
        let newMeetings = myCase.meetingsHeld + 1;
        let newProgress = 20 + (newMeetings * 10);

        if (newProgress >= 100) {
            newProgress = 100;
            myCase.status = "Resolved"; // Auto-resolve at 100%
        } else {
            myCase.status = "In Progress";
        }

        myCase.meetingsHeld = newMeetings;
        myCase.progress = newProgress;
        await myCase.save();

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.redirect('/dashboard');
    }
});

// --- DELETE CASE ---
app.post('/delete-case/:id', async (req, res) => {
    await Case.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
});

app.listen(port, () => {
    console.log(`\n🚀 LegalAid Pro server is running on http://localhost:${port}\n`);
});