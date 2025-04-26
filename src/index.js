import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Config-------------------------------------------------------------------
dotenv.config();
const app = express();

// Port
const PORT = process.env.PORT || 5000;

// Using cors and express.json() middleware
app.use(cors());
app.use(express.json());

// Notify the server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// API Routes---------------------------------------------------------------
// Start building the API
// App.use.....
