const express = require("express");
const path = require("path")
const members = require("./Members")
const logger = require("./logger");
const router = require("./routes/api/members");
const exphbs = require("express-handlebars")


const app = express();


//init middleware

//Handlebars Middleware
app.engine("handlebars", exphbs.engine({ defaultLayout:"main"}));
app.set('view engine', 'handlebars');


//Body Parser MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(logger);

//homepage route
app.get("/", (req,res) => res.render("index",{
    title:"Members App",
    members
}))


//members api routes
app.use("/api/members", require("./routes/api/members"))

// set static folder 
app.use(express.static(path.join(__dirname,"public")))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

