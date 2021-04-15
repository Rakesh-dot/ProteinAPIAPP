const { json } = require('express')
const express = require('express')
const { protect } = require('../middleware/auth')
const router = express.Router()
const Booking=require('../model/cart')
const Product=require('../model/whey')
const date = new Date().toLocaleDateString("en-US").split("/").toString()
 
router.post('/booking/:pid',protect,function(req,res){
console.log(req.user)
const uid= req.user._id
const pid= req.params.pid
 
const data = new Booking({UserId:uid,ProductId:pid})
data.save().then(function(r){
    console.log("Booking ma chiryo")
    res.status(200).json({message:"Booking Succesful",success:true})
}).catch((err)=>{
 
console.log(err)
 
})
 
})


    






 
router.get('/booking/show',protect,function(req,res){
const id = req.user._id
 
Booking.find({UserId:id}).populate('ProductId').then(function(data){
    console.log(data)
    let total =0
    data.map((item)=>{
 
        let qty = item.Qty
        let price = item.ProductId.pprice;
        total += price * qty
      
      
      
       
      })
res.status(200).json({data:data,total:total})
}).catch()
})


router.delete('/delete/:id',function(req,res){
    Booking.findByIdAndDelete({_id:req.params.id}).then(function(result){
       res.status(200).json({success:true})
    })
})

router.put('/updateBooking/:bid',protect,function(req,res){
 
    Booking.findOneAndUpdate({_id:req.params.bid},{
        Qty:req.body.Qty
    }).then(function(data){
        res.status(200).json({success:true,message:"Updated"})
    })
     
    })
     router.delete('/deletep/:bid',function(req, res){
        console.log("hellp",req.params.bid)
         Product.findByIdAndDelete({_id:req.params.bid}).then(function(data){
        
        res.status(201).json({succes:true})
        
          }).catch(function(err){
              console.log(err)
          })
        })

        router.get("/aa",protect,function(req,res){
            res.status(200).json({data:req.user})
        })


module.exports=router;