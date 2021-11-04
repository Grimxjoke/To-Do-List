const express = require("express");                 //CALLING EXPRESS
const bodyParser = require("body-parser");          //CALLING BODY-PARSER
const date = require(__dirname + "/date.js");        // CALLING /date.js
const app = express();                              //CREATE THE APP KEYWORD


app.set("view engine", "ejs");                      // CALLING EJS
app.use(bodyParser.urlencoded({extended: true}));   // USE BODY-PARSER
app.use(express.static("public"));                  // CALLING THE PUBLIC FOLDER FOR STYLING


const items = [];
const workItems = [];



app.get("/", (req, res) => {        // CREATE A HOME ROUTE
  const day = date.getDate();
  res.render("list", {listTitle: day, newListItem: items});
});


app.get("/work", (req, res) => {    // CREATE A WORK ROUTE
  const item = req.body.newItem;
  res.render("list", {listTitle: "Work List", newListItem: workItems })
});



app.get("/about", (req, res) => {   // CREATE A ABOUT ROUTE
  res.render("about");
})


app.post("/", (req, res) => {       // PUSH A NEW ITEM IN THE TO-DO LIST
  const item = req.body.newItem;
  if(req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }else{
  items.push(item);
  res.redirect("/");
  }
});

// LISTENING ON PORT 3000
app.listen(3000, () => console.log("Server started on port 3000"));
