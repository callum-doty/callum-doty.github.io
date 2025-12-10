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
    // First try to find the file in the pages directory
    const pagesFile = path.join(__dirname, 'pages', `${req.path}.html`);
    res.sendFile(pagesFile, (err) => {
      if (err) {
        // If not found in pages, try root directory
        const rootFile = path.join(__dirname, `${req.path}.html`);
        res.sendFile(rootFile, (err) => {
          if (err) {
            next();
          }
        });
      }
    });
  } else {
    next();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
