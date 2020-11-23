const express 	= require('express');
const userModel	= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index')
})

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status,results){
		if(status){
			console.log(results);
			res.cookie('uname', req.body.username);
			var user = {
				username: results[0].username,
				id: results[0].id,
				type : results[0].type,
				email: results[0].email,
				phone: results[0].contactNumber,
				pass: results[0].password,
			};
			console.log(user);
			req.session.use =user;
			req.session.designation = results[0].designation;
			req.session.mail = results[0].email;
			req.session.phone = results[0].contactNumber;
			req.session.username=results[0].username;
			req.session.idd = results[0].id;
			req.session.pass = results[0].password;
			res.redirect('/markethome');
		}else{
			res.redirect('/login');
		}
	});

})

module.exports = router;