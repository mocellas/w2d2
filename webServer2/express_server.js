const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080

app.set("view engine", "ejs");

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",
};

function stringGen(len)
{
  var text = " ";

  var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < len; i++ )
    text += charset.charAt(Math.floor(Math.random() * charset.length));

  return text;
}

console.log(stringGen(6));

app.get("/", (req, res) => {
  res.end("Hello!");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});
//W2D3
app.get("/urls/:id", (req, res) => {
  let longUrl = urlDatabase[req.params.id]
  let templateVars = { shortURL: req.params.id, urls: urlDatabase, longUrl: longUrl};
  console.log(longUrl)
  console.log(req.params.id)
  //res.send("Ok");
  res.render("urls_show", templateVars);
});
//W2D3
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.post("/urls", (req, res) => {
  var randomURL = stringGen(6);
  urlDatabase[randomURL] = req.body.longURL;

  // console.log(req.body.longURL);  // debug statement to see POST parameters
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

//W2D3 - Delete route
app.post("/urls/:id/delete", (req, res) => {
  var deleteID = req.params.id;
  delete urlDatabase[deleteID];
  res.render('/urls_show');
});

//W2D3 - update route
app.post("/urls/:id/update", (req, res) => {
  var updateID = req.params.id;
  //update urlDatabase[updateID];
  res.redirect('/urls_show');
});


app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/u/:shortURL", (req, res) => {
  console.log(urlDatabase)
  let longURL = urlDatabase[req.params.shortURL]
  console.log(longURL);
  res.redirect(longURL);
});
