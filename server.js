/* server.js - Express server*/
'use strict';

const express = require('express')
const app = express();

const path = require('path');

// Setting up a static directory for the files in /pub
// using Express middleware.
app.use(express.static(path.join(__dirname, '/pub')))


app.get('/', (req, res) => {
	res.send('sample SmartScroll app!');
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
}) 
