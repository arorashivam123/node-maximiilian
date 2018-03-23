const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
     email:{type:String,required:true,match:/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/},
     password:{type:String,required:true}
});
module.exports=mongoose.model('users',userSchema);
