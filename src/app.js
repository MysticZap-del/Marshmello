require("dotenv").config();   // 👈 MUST BE FIRST
const express = require("express");
const app = express();
require("./db/conn");
const UserMessage = require("./models/userMessage");
const PORT = process.env.PORT || 3000;
const hbs = require("hbs");
const path = require("path");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const staticPath = path.join(__dirname, "../public");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcryptjs");
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const auth = require("./middlewares/auth");
const Register = require("./models/register");
const limitter = require("express-rate-limit");

const loginLimiter = limitter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: "Too many login attempts, please try again later.",
})


// Middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")),
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")),
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist")),
);
app.use(express.static(staticPath));
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up Handlebars as the view engine
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.redirect("/index");
});
app.get("/index", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});



app.post("/contact", auth, async (req, res) => {
  try {
    const userData = new UserMessage(req.body);
    await userData.save();
    res.redirect("/index");
  } catch (error) {
    res.send(error);
  }
});

app.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email }); // this is looking the entire database for the email and if it is found then it will return the user data otherwise it will return null
    // now i m going to add indexing to reduce the time complexity of finding the user by email from O(n) to O(log n)
    if (!user) {
      return res.send("Invalid Login Credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("Invalid Login Credentials");
    }

    // Generate JWT
    const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // after genrating the token we will store it in cookie
    res.cookie("token", token, {
      httpOnly: true,
    });

    res.redirect("/index");
  } catch (error) {
    res.send(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.send("Passwords do not match");
    }

    const data = new Register(req.body);
    await data.save();
    res.redirect("/index");
  } catch (error) {
    res.send(error);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/index");
});

app.get("/messages", auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const messages = await UserMessage.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(messages);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// console.log(await Register.collection.indexes());
app.listen(PORT, () => {
  console.log(`Server is listening on: http://localhost:${PORT}/`);
});
