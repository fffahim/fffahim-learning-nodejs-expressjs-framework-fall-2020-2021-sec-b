const express 	= require('express');
const cartsModel = require.main.require('./models/cartsModel');
const router 	= express.Router();

router.get('/:id', (req, res)=>{
	if(req.cookies['uname'] != null){
		var user= req.params.id;
		cartsModel.getById(user,function(results){
			res.render('mycart/index',{userlist:results});
		})
	}else{
		res.redirect('/login');
	}
})
router.post('/', (req, res)=>{
	if(req.cookies['uname'] != null){
		var user={
			 id: req.cookies['id'],
			 company:req.body.item_cmp,
			 price:req.body.item_price,
			 type:req.body.item_type
		}
		cartsModel.insert(user,function(results){
			res.send("");
		})
	}else{
		res.redirect('/login');
	}
})
module.exports = router;