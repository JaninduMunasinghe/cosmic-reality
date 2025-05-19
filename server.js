const express = require('express');
const app = express();
const path = require('path');
const ip = require('ip');

// Serve static files
app.use(express.static(path.join(__dirname, '/')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve index.html on root
app.get("/", (req, res) => {
    // res.render('index');
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Open to network on port 8080
app.listen(8080, () => {
  console.log(`Server is running on http://${ip.address()}:8080/`);
  console.log(`Server is running on http://localhost:8080/`);
});