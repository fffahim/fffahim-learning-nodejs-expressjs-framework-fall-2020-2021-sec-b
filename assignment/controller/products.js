const express 	= require('express');
const productsModel = require.main.require('./models/productsModel');
const cartsModel = require.main.require('./models/cartsModel');
const router 	= express.Router();

router.get('/:type', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		var type= req.params.type;
		productsModel.getById(type,function(results){
			res.render('products/index',{userlist:results});
		})
	}else{
		res.redirect('/login');
	}
})
router.get('/profile',(req,res)=>{
	if(req.cookies['uname'] != null){
		res.render('home/profile');
	}else{
		res.redirect('/login');
	}
})
router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/userlist', {userlist: results});
	});

});

module.exports = router;