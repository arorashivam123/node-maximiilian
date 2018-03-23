const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/users');
const bcrypt=require('bcrypt');
router.get('/',(req,res,next)=>{
User.find({}).select('email _id').exec().then(result=>{
if(result.length>0){
  const response={
    count:result.length,
    users:result
  }
  res.status(200).json(response);
  console.log(response);
}
else{
  console.log(result);
  res.status(404).json({message:"No user Found"});
}
})

});


router.post('/signup',(req,res,next)=>{
  User.find({email:req.body.email}).
exec().then(user=>{
  if(user.length>=1){
    res.status(409).json({message:"Email already exist"});
    console.log(user+' already exist');
  }
  else{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
      return res.status(500).json({error:err})
    }
    else{
      const user=new User({
        email:req.body.email,
        password:hash
      });
    user.save().
    then(result=>{
    console.log(result);
      res.status(200).json({message:"user created"});

    })
    .catch(err=>{console.log(err);res.status(500).json({error:err})});
    }


    });


  }
});
});
router.delete('/:userId',(req,res,next)=>{
User.remove({_id:req.params.userId}).
exec()
.then(result=>{
  console.log(result);
  res.status(200).json({message:"user Deleted"});
}).catch(err=>{console.log(err);res.status(500).json({error:err})});

});
module.exports=router;
