const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
mongoose.connect('mongodb://test:test@ds117719.mlab.com:17719/restapi');


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
const productsRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');
const userRoutes=require('./api/routes/users');
app.use('/images',express.static('uploads'));
app.use('/orders',orderRoutes);
app.use('/products',productsRoutes);
app.use('/users',userRoutes);
app.use((req,res,next)=>{
  const error=new Error('Not Found');
  error.status=404;
  next(error);
});
app.use((error,req,res,next)=>{
  res.status(error.status||500);
  res.json({
    message:error.message
  });
});

module.exports=app;
