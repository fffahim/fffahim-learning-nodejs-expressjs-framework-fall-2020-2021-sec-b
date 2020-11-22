const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const clientsModel = require.main.require('./models/clientsModel');
const fastcsv 		= require("fast-csv");
const fs 			= require("fs");
const router 	= express.Router();

router.get('/', (req, res)=>{

	if(req.cookies['uname'] != null){
	    var user = {
		username: req.session.username,
		id: req.session.idd,
		fullname : req.session.fname,
		email: req.session.mail,
		phone: req.session.phone,
		gender:req.session.gen
	};
		res.render('markethome/index' ,{userlist:user});
	}else{
		res.redirect('/login');
	}
})
router.get('/profile',(req,res)=>{
	if(req.cookies['uname'] != null){
		var user = {
		username: req.session.username,
		id: req.session.idd,
		fullname : req.session.fname,
		email: req.session.mail,
		phone: req.session.phone,
		gender:req.session.gen,
		pass: req.session.pass
	};
		res.render('markethome/profile',{userlist:user});
	}else{
		res.redirect('/login');
	}
})
router.post('/profile',(req,res)=>{
	var user = {
		username: req.body.username,
		id: req.session.idd,
		fullname : req.body.fullname,
		email: req.body.email,
		phone: req.body.phone,
		pass: req.body.password
	};
	userModel.update(user,function(status){
		if(status)
		{
			res.cookie('uname', req.body.username);
			req.session.fname = user.fullname;
			req.session.mail = user.email;
			req.session.phone = user.phone;
			req.session.username=user.username;
			req.session.idd = user.id;
			req.session.pass = user.pass;
			res.redirect('/markethome/profile');
		}
		else
		{
			console.log(user);
			res.render('markethome/profile',{userlist:user});
		}
	})
})
router.get('/:id', (req, res)=>{

	var data = req.params.id;
	if(data=='leads')
	{
		clientsModel.getAll('leads',function(results){
		res.render('markethome/leadslist', {userlist: results});
		});
	}
	else
	{
		clientsModel.getAll('customer',function(results){
		res.render('markethome/customerlist', {userlist: results});
	});
	}

});
router.get('/csv/:id',(req,res)=>{
	var data = req.params.id;
	if(data=='leads')
	{
		clientsModel.getAll('leads',function(results){
		const jsonData = JSON.parse(JSON.stringify(results));
    	console.log("jsonData", jsonData);
    	var ws=fs.createWriteStream("controller/marketing/files/sample.csv");
    	fastcsv
      	.write(jsonData, { headers: true })
      	.on("finish", function() {
        	res.download(__dirname+'/files/sample.csv','sample.csv',function(err){
      		if(err)
      		{
      			console.log(err);
      		}
      		else
      		{
      			console.log("i");
      		}
      	})
      	})
      	.pipe(ws);

	});
	}
	else
	{
		clientsModel.getAll('customer',function(results){
		const jsonData = JSON.parse(JSON.stringify(results));
    	console.log("jsonData", jsonData);
    	var ws=fs.createWriteStream("controller/marketing/files/customer.csv");
    	fastcsv
      	.write(jsonData, { headers: true })
      	.on("finish", function() {
        	res.download(__dirname+'/files/customer.csv','customer.csv',function(err){
      		if(err)
      		{
      			console.log(err);
      		}
      		else
      		{
      			console.log("i");
      		}
      	})
      	})
      	.pipe(ws);

	});
	}
})
module.exports = router;