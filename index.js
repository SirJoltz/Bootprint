import { greet } from "./utils.js";

console.log("🚀 App Started!");

try {
    const name = "Elliott";
    console.log(greet(name));
} catch (error) {
    console.error("❌ Error:", error.message);
}

// index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});