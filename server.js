const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware to remove .html extension
app.use((req, res, next) => {
  if (req.path.indexOf('.') === -1) {
    const file = path.join(__dirname, `${req.path}.html`);
    res.sendFile(file, (err) => {
      if (err) {
        next();
      }
    });
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
