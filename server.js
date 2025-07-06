const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'pages')));

// Define routes for /simple and /complex
app.get('/simple', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'simple.html'));
});

app.get('/complex', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'complex.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'about.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'blog', 'index.html'));
});

app.get('/blog/blog-post-1', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'blog', 'blog-post-1.html'));
});

app.get('/blog/blog-post-2', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'blog', 'blog-post-2.html'));
});

app.get('/blog/blog-post-3', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'blog', 'blog-post-3.html'));
});

// Route for the fork page
app.get('/fork', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'fork.html'));
});

app.get('/project-catalog', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'project-catalog.html'));
});

// Route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
