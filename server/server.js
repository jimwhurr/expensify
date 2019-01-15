const express = require('express');
const app = new express();
const path = require('path');

// setup to serve from the public folder
const publicPath = path.join( __dirname, '..', 'public');
app.use(express.static(publicPath));

// ensure that index.js is served for all INTERNAL routes to avoid server
// trying to serve INTERNAL ttoutes!
app.get('*', (req, res) => {
    res.sendFile( path.join(publicPath, 'index.html') );
})

// set port and start
app.listen(3000, () => {
    console.log('Server running');
});
