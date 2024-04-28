const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const App = require('express')();
var http = require('http').Server(App);

const PORT = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
console.log("hdbfhksb");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017");
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log(`Error in MongoDB ${error}`);
    }
};

connectDB();

let EL;
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    Password: String
});


const user = mongoose.model("user", userSchema);

app.get('/', (req, res) => {
    res.render("index");
});

app.get('/moviespage', (req, res) => {
    res.render("moviespage");
});

app.get('/about', (req, res) => {
    res.render("about");
});
app.get("/action", (req, res) => {
    res.render("action");
});
app.get("/romance", (req, res) => {
    res.render("romance");
});
app.get("/hollywood", (req, res) => {
    res.render("hollywood");
});
app.get("/bollywood", (req, res) => {
    res.render("bollywood");
});
app.get("/hollywood", (req, res) => {
    res.render("hollywood");
});

app.get("/comedy", (req, res) => {
    res.render("comedy");
});


app.get("/logout",(req,res)=>{
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup", { user: req.user });
});

app.get("/login", (req, res) => {
    res.render("login");
});

// app.get("/success", (req, res) => {
//     res.render("home", { name: req.user.displayName, email: req.user.email[0].value, pic: req.user.photos[0].value });
// });

// app.get("/failed", (req, res) => {
//     res.send("You Failed to log in!");
// });

app.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect("/login");
    });
});

app.post("/Sign", async (req, res) => {
    let { name, email, password } = req.body;
    let user_email = await user.findOne({ email: email });
    if (user_email) {
        res.send("Email Id is already registered");
    } else {
        const User1 = new user({
            name: name,
            email: email,
            Password: password
        });
        User1.save();
    }
    EL = email;
    res.redirect("/moviespage")
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await user.findOne({ email: email,Password:password });
    if (foundUser) {
        res.redirect("/moviespage");
    } else {
        res.send("Invalid Credentials");
    }

    EL = email;
});

app.listen(PORT, () => {
    console.log(`Server Running on mode on port ${PORT}`);
});