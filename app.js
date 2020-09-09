let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './stream' );
let path = require( 'path' );
const mongoose = require('mongoose');

app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

//database connection
mongoose.connect('mongodb://localhost/restapi')
    .then(() => {console.log("Successfully connected to the database");})
    .catch(err => {console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );

app.get( '/signup', ( req, res ) => {
    res.sendFile( __dirname + '/signup.html' );
} );

io.of( '/stream' ).on( 'connection', stream );

server.listen( 3000,() =>  
	console.log("Server running on port 3000.....")
);

