const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const multer=require('multer');

const storage=multer.diskStorage({
  destination:(req,res,cb)=>{
    cb(null,'./uploads');
  },
filename:(req,res,cb)=>{             //error on reading (file.originalname)
    cb(null,new Date().toISOString()+req.file);
  }
});

const upload=multer({storage:storage});



//product schema
const Product=require('../models/products')

router.get('/',(req,res,next)=>{
Product.find().select('name price _id').exec().then(doc=>{
  console.log(doc);
  if(doc.length >0){
    const response={
      count:doc.length,
      products:doc
    };
   res.status(200).json(response);
  }
  else {
    res.status(404).json({
      message:"No Enteries Found"
    });
  }

}).catch(err=>{
  console.log(err);
  res.status(500).json({error:err});
});
});
router.post('/',upload.single('productImage'),(req,res,next)=>{
console.log(req.file);

   const product={
     name:req.body.name,
     price:req.body.price
   };
   const productstore=new Product({
     name:req.body.name,
     price:req.body.price,
     productImage:req.file.path
   });
   productstore.save().then(result=>{
     console.log(result);
     res.status(201).json(result);
   }).catch(err=>{
     console.log(err);
     res.status(500).json(err);
   });

});
router.get('/:productID',(req,res,next)=>{
const id=req.params.productID;
  Product.findById(id)
  .exec()
  .then(doc=>{
    console.log(doc);
    res.status(200).json(doc);
  }).catch(err=> {
    console.log(err);
    res.status(500).json({error:err});
  });

  });

router.patch('/:productID',(req,res,next)=>{
//not able to get from videos
id=req.params.productID;
const updateOps={};
for(const ops of req.body){
  updateOps[ops.propName]=ops.value;
}
Product.update({_id:id}).exec().
then(result=>{console.log(result);res.status(200).json(result)})
.catch(err=>{console.log(err);res.status(500),json({error:err})});
});

router.delete('/:productID',(req,res,next)=>{
  id=req.params.productID;
Product.remove({_id:id}).exec().then(result=>{
  res.status(200).json({result});
}).catch(err=>{console.log(err);res.status(500).json({error:err})});

});

module.exports=router;
