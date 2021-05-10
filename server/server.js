/* server.js - Express server*/
'use strict';

const express = require('express')
const app = express();

const path = require('path');

//serve react build
const buildPath = path.join(__dirname,  "/build");
app.use(express.static(buildPath));
app.use("/static", express.static(path.join(__dirname, "build/static")));

app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/build/index.html'))); 

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
}) 
