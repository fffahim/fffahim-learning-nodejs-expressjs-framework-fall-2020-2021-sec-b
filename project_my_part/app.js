//declaration
const express 		= require('express');
const expl          = require('express-ejs-layouts');
const bodyParser 	= require('body-parser');
const exSession 	= require('express-session');
const cookieParser 	= require('cookie-parser');
const nodemailer 	= require("nodemailer");
const {check,validationResult}=require('express-validator');
const login			= require('./controller/login');
const home			= require('./controller/home');
const markethome	= require('./controller/marketing/markethome');
const logout		= require('./controller/logout');
const campaigns			= require('./controller/marketing/campaigns');
// const user			= require('./controller/user');
const clients		= require('./controller/marketing/clients');
const fastcsv 		= require("fast-csv");
const fs 			= require("fs");
const app 			= express();

app.use(expl);
//config
app.set('view engine', 'ejs');
//middleware
app.use('/abc', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());
app.use('',function(req, res, next) {
	console.log(req.session.username);
  res.locals.glob = req.session.use;
  next();
});
app.use('/login', login);
app.use('/home', home);
app.use('/markethome', markethome);
app.use('/campaigns',campaigns);
app.use('/logout', logout);
// app.use('/user', user);
app.use('/clients',clients);
//route
app.get('/', (req, res)=>{
	res.send('Hello from express server');	
});

//server startup
app.listen(3000, (error)=>{
	console.log('express server started at 3000...');
});