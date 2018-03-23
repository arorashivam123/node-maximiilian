const express=require('express');
const router=express.Router();

router.get('/',(req,res,next)=>{
  res.status(200).json({
    message:"order was fetched"
  });
});

router.post('/',(req,res,next)=>{
const order={
  productID:req.body.productID,
  quantity:req.body.quantity
}
  res.status(201).json({
    message:"order was created",
    order:order
  });
});
router.get('/:ordersID',(req,res,next)=>{
  res.status(200).json({
    message:"Id is generated",
    orders:req.params.ordersID
  });
});

router.delete('/:ordersID',(req,res,next)=>{
  res.status(200).json({
    message:"Id to be deleted",
    orders:req.params.ordersID
  });
});
module.exports=router;
