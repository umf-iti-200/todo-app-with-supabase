require('dotenv').config()

const express = require("express");

const createClient = require("./supabase.js");

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

    const supabase = createClient({ req, res })

    const { data, error } = await supabase.auth.signOut();

    console.log(data);
    console.error(error);

    return res.redirect("login.html");
});

app.get("/sign-up", async (req, res) => {
    return res.redirect("sign-up.html");
});


app.get("/items", async (req, res) => {

    const supabase = createClient({ req, res })

    const { data, error } = await supabase.from('items').select('*');

    // console.log(data);

    return res.json(data);
});

app.post("/sign-up", async (req, res) => {

    const payload = {
        email: req.body.email,
        password: req.body.password,
        options: {
            data: {
                display_name: req.body.name,
            }
        }
    }

    const supabase = createClient({ req, res })

    const { data, error } = await supabase.auth.signUp(payload);

    return res.redirect("home.html");
});

app.post("/login", async (req, res) => {

    const payload = {
        email: req.body.email,
        password: req.body.password,
    }

    const supabase = createClient({ req, res })

    const { data, error } = await supabase.auth.signInWithPassword(payload);

    return res.redirect("home.html");
});

app.post("/save", async (req, res) => {

    const name = req.body.name;

    const supabase = createClient({ req, res })

    const { data, error } = await supabase.from('items').insert({ name });

    return res.redirect("home.html");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
