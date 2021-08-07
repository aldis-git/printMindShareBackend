const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

//Load env vars
require("dotenv").config({ path: "./config/config.env" });
require("./config/init_mongodb.js");

//Import our custom Middleware
const errorHandler = require("./middleware/errorHandler.js");

// Route files
const materials = require("./routes/materials.js");
const materialItems = require("./routes/materialItems.js");
const authentication = require("./routes/authentication.js");
const palletizer = require("./routes/palletizer.js");

const app = express();

//Middleware for console loging all incomming http requests.
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

//Middleware for parsing json for all incomming requests. Body parser.
app.use(express.json());

//Middleware for parsing cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser());

// Middleware for sanetizing incomming data. It needs to be as last one, after datas are parsed.
app.use(mongoSanitize());

// Prevent cross site scripting attacks. Sanitize user input coming from POST body, GET queries, and url params.
app.use(xss());

// Middleware to limit ammount of incomming requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000, //Requests per time
});
app.use(limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Set security headers
app.use(helmet());

// Mount routers
app.use("/api/v1/materials", materials);
app.use("/api/v1/material-items", materialItems);
app.use("/api/v1/authentication", authentication);
app.use("/api/v1/palletizer", palletizer);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
