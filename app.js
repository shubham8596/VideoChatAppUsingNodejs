const express = require( 'express' );
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session')
const app = express();
const server = require( 'http' ).Server( app );
const io = require( 'socket.io' )( server );
const path = require( 'path' );
const User = require('./model/user');
const UserLogin = require('./model/userslogin');
const stream = require( './stream' );
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const config = require('./config/config.js');
app.use(bodyParser.json());
require('./config/passport-setup');
//require('./routes/routes.js')(app);

let user = {}
let client={}
let data=[]
var a;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(__dirname)); 

var dbConn = mongodb.MongoClient.connect('mongodb://localhost/restapi');

app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))


app.set('view engine','ejs')

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/restapi')
	.then(() => {console.log("Successfully connected to the database");})
	.catch(err => {console.log('Could not connect to the database. Exiting now...', err);
	process.exit();
});

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/',  function(req, res) { 
    res.sendFile( __dirname + '/public/login.html' ); 
});



app.get('/good', isLoggedIn, (req, res) =>{
    user = {name:req.user.displayName,pic:req.user.picture,email:req.user.emails[0].value}
    client = {firstname : req.user.given_name, lastname : req.user.family_name, email : req.user.email}
    res.render("pages/profile",user)
})

app.get('/signup',passport.authenticate('google', { failureRedirect: '/failed' }),  function(req, res) {
     res.redirect('/good');
});

app.get('/failure', function(req, res) {
    console.log("In Failure")
    res.sendFile(__dirname+"/public/abc.html");
});


app.post('/good',  function(req, res) {
	
	dbConn.then(function(db) 
	{
        User.find()
        .then(students => {
            data=[...students];
            for(var i=0;i<data.length;i++)
            {
                    if(client.email===data[i].email)
                    {
                        a=1;
                        res.redirect("/failure");
                        break;
                    }
            }
            if(a!=1)
            {
                    db.collection('users').insertOne(client);  
                    a=0;
                    res.redirect("/");
            } 
        }).catch(err => {
                message: err.message
        });      
    }) 
});

app.post('/', function(req,res) {

    dbConn.then(function(db2) 
    { 
    const userlogin = new UserLogin({
        roomid: req.body.roomid, 
        email: req.body.email
       });
       userlogin.save()
      // res.send(userlogin);
       db2.collection('userslogins').insertOne(userlogin);
    })
});

io.of( '/stream' ).on( 'connection', stream );

server.listen( config.serverport,() =>  
	console.log(`Server running on port ${config.serverport}.....`)
);
