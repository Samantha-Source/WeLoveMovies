if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

// added here but might need to be router level
const cors = require("cors");  
//////////

const moviesRouter = require("./movies/movies.router");

app.use(express.json());

// added here but might need to be router level
app.use(cors());    
//////////

app.use("/movies", moviesRouter);




// Not found Handler
app.use((req, res, next) => {
  next({status: 404, message:`Not found: ${req.originalUrl}`});
});


// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message="Oh No! Something went horribly wrong!"} = error;
  res.status(status).json({ error: message });
});



module.exports = app;
