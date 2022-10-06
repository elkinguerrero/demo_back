const express = require('express');
const path = require('path');
const server = express();

// settings
server.set('port', process.env.PORT || 8080);
server.set("dist", path.join(__dirname,'dist'));

server.use(express.json({limit: '50mb'}));

// static files
server.use(express.static(path.join(__dirname, "dist")));
//se llama un controlador
server.use('/request', require('./controller/request'));

//listen
server.listen(server.get('port'), function() {
    console.log(`server on port ${server.get('port')}`);
})