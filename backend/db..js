const mongoose=require("mongoose");
mongoose.connect('mongodb+srv://krohit8:mongoDB8@krohit8.4fc1p2a.mongodb.net/paytm-clone')
.then(()=>{
    console.log("db connected")
})

const userSchema= mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
})
const accountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",  //ref restricts to create schema only for those who exists in the user
        required:true

    },
    balance:{
        type: Number,
        required: true
    }
})
const Account=mongoose.model('Account', accountSchema)
const User=mongoose.model('User' , userSchema);


module.exports={
    User,
    Account
};
