// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Require bodyParser to extracts the entire body portion of an incoming request stream and exposes it on req.body.
const bodyParser = require("body-parser");
// Require Cors to allows a server to indicate any origins other than its own from which a browser should permit loading of resources.
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

// GET route
app.get("/allData", (req, res) => res.send(projectData));

// POST CallBack function
const add = (req, res) => {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    res.end();
    console.log(projectData);
};
// POST route
app.post("/addData", add);