require('dotenv').config()

const express = require("express");

const {createClient} = require("./supabase.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

const items = [];

app.post("/", async (req, res) => {
    return res.redirect("index.html");
});

app.get("/login", async (req, res) => {
    return res.redirect("login.html");
});

app.get("/logout", async (req, res) => {
    return res.redirect("login.html");
});

app.get("/sign-up", async (req, res) => {
    return res.redirect("sign-up.html");
});


app.get("/items", async (req, res) => {

    return res.json(items);
});

app.post("/sign-up", async (req, res) => {

    const data = req.body;

    console.log(data)

    return res.redirect("home.html");
});

app.post("/login", async (req, res) => {

    const data = req.body;

    console.log(data)

    return res.redirect("home.html");
});

app.post("/save", async (req, res) => {

    const data = req.body;

    const name = data.name;

    items.push(name);

    return res.redirect("home.html");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
