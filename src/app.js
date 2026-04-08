const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/posts", postRoutes);

// health check
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Blog API" });
});

module.exports = app;
