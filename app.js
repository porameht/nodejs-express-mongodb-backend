const express = require("express");
const chalk = require("chalk");
const PORT = process.env.PORT || 3000;
const debug = require("debug")("app");
const app = express();
const morgan = require("morgan");
const path = require("path");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require("express-session");


const sessionsRouter = require("./src/routers/sessionRouter");
const adminRouter = require("./src/routers/adminRouter");
const authRouter = require("./src/routers/authRouter")


// ------------------------------------------------
// app.use(morgan('combined'));
app.use(morgan("tiny"));
// app.use views index.html set in public directory
app.use(express.static(path.join(__dirname, "/public/")));
// authRouter
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// passport middleware
app.use(cookieParser())
app.use(session({secret:"globomantics"}))
require('./src/config/passport.js')(app)
// ------------------------------------------------




app.set("views", "./src/views");
app.set("view engine", "ejs");

// middleware
app.use("/sessions", sessionsRouter);
app.use("/admin", adminRouter);
app.use('/auth',authRouter);




// exemple pass data
app.get("/", (req, res) => {
  // res.send("Hello Frank");
  res.render("index", { title: "Frank Home", data: ["a", "b", "c", "d"] });
});

app.listen(PORT, () => {
  // console.log(`Server port ${chalk.green(port)} is running...`);
  debug(`Server port ${chalk.green(PORT)}`);
});
