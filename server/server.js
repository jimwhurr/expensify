const express = require('express');
const app = new express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// setup to serve from the public folder
const publicPath = path.join( __dirname, '..', 'public');
app.use(express.static(publicPath));

// ensure that index.js is served for all INTERNAL routes to avoid server
// trying to serve INTERNAL ttoutes!
app.get('*', (req, res) => {
    res.sendFile( path.join(publicPath, 'index.html') );
})

// set port and start
app.listen(PORT, () => {
    console.log('Server running');
});
