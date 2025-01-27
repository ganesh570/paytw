const express=require('express');
const {User,Accounts}=require('../db');
const router=express.Router();
const zod=require('zod');
const jwt=require('jsonwebtoken');
const {JWT_SECRET}=require("../config");
const {authMiddleware}=require('../middleware');

router.get("/",async (req,res)=>{
    res.status(200).json({
        message:"Success!"
    })
})

router.get('/me',authMiddleware,async (req,res)=>{
       const userId=req.userId;
       if(!userId){
        return res.status(403).json({
            message:"Not logged in"
        })
       }
       try{
        const user=await User.findById(userId)
        const account=await Accounts.findOne({
                userId:userId
            })

        res.status(200).json({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            balance:account.balance,
            id:userId
        });
       }catch(e){
            console.error(e);
       }
})
 
const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
    
})

router.post('/signup',async (req,res)=>{
   
    const {success}=signupSchema.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }

    const euser=await User.findOne({
        username: req.body.username
    })
    
    if(euser){
        return res.json({message:"Email already taken"});
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
        const userId=user._id;

        await Accounts.create({
            userId:userId,
            balance:10000
        })
        
        const token=jwt.sign({
            userId
        },JWT_SECRET);

        res.json({
            message:"User created successfully",
            token: token
        })
    
});

const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})


router.post('/signin',async (req,res)=>{
    
    const {success}=signinSchema.safeParse(req.body);
    
    if(!success){
        return res.status(411).json({
            message:"Incorrect Inputs"
        })
    }
    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })
    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);
        
        res.status(200).json({
            token:token
        });
        return;
    }
    res.status(411).json({message: "Error while logging in"});
    
});

const updateSchema=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional() 
})

router.put("/",authMiddleware,async (req,res)=>{
    
    const {success}=updateSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({message: "Error while updating information"});
        return;
    }

    await User.updateOne(req.body,{
        _id:req.userId
    });
    res.json({message:"Updated successfully"});
});


router.get('/bulk',async (req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user:users.map((user)=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})



module.exports=router;