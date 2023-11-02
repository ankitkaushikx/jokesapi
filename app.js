import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs"); // Set EJS as the view engine
app.set("views", path.join(__dirname, "views")); // Specify the views directory

// ?----------------------------------CONSTANTS-------------------
const API_URL = "https://v2.jokeapi.dev/joke";

// ?-----------------------------------HOMEURL---------------------
app.get("/", async (req, res) => {
  const response = await axios.get(API_URL + "/Any");
  const result = response.data;
  res.render("index", { joke: result });
});

app.post("/getNewJoke", async (req, res) => {
  const type = req.body.type;
  console.log(type);
  const response = await axios.get(API_URL + "/" + type);

  const result = response.data;
  res.render("index", { joke: result });
});

app.listen(port, () => {
  console.log(`SERVER STARTED AT ${port}`);
});
