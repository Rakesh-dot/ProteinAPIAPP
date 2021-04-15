const mongoose = require("mongoose");

const Whey = new mongoose.Schema(
    {
    
        proteinname:{
            type: String,
            required: [true,"Enter protein name"],
            
        },
        weight:{
            type: String,
            required: [true,"Enter weight"],
        },
        price:{
            type: String,
            required: [true,"Select price"],
            trim: true
        },
        photo: {
            type: String,
            default: "no-photo.jpg",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);
const data =mongoose.model("Whey",Whey);
module.exports = data
