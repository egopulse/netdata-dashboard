const express = require('express');
const path = require('path');
const app = express();

app.use('/dashboard', express.static(path.join(__dirname, 'build')));

app.get('/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(5000, () => {
  console.log("Sever started on port 5000")
});