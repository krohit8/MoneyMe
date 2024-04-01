const express = require("express");
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {JWT_SECRET}=require('../config')
const { Account, User }=require("../db.");
const {authMiddleware}=require("../middleware")
const SignupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.number(),
});
router.post("/Signup", async (req, res) => {
  const body = req.body;
  const { success } = SignupSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const user = User.findOne({
    username: body.username,
  });
  if (user._id) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }
  await Account.create({
    userId,
    balance: 1+ Math.random()*10000
  })
  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created  successfully",
    token: token,
  });
});


const signinSchema=zod.object({
    username:zod.string(),
    password:zod.string()
})

router.post("/signin", async(req,res)=>{
const {success}= signinSchema.safeParse(req.body);
if(!success){
    return res.status(411).json({
        message: "Incorrect inputs"
    })
}
const user=await User.findOne({
    username:req.body.username,
    password:req.body.password
})
if(user){
    const token= jwt.sign({
        userId:user._id
    }, JWT_SECRET)
    res.json({
        token:token
    })
    return;
}
res.status(411).json({
    message: "Error while logging in"
})
})

const updateBody=zod.object({
    username:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
router.put("/", authMiddleware,async (req,res)=>{
    const {success}=updateBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    await User.updateOne({_id:req.userId} , req.body)
    res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk", async(req,res)=>{
    const filter=req.body.filter || " ";
    const users=await User.find({
        $or: [{
            firstName:{
                "$regex": filter
            }
        },{
            lastName:{
                "$regex": filter
            }
        }]
    })
res.json({
    user: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }))
})
})





module.exports = router;
