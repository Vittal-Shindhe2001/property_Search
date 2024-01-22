const mongoose=require('mongoose')

const Schema=mongoose.Schema({
    location:{
        type:String,
        required:true
    },
    propertyType:{
        type:String,
        required:true
    },
    purchaseType:{
        type : String,
        enum : ['Buy','Rent','PG/Co-Living']
    },
    project:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    description: {
        type:String,
       
    },
    image:String,
})

const Property=mongoose.model("Property",Schema)

module.exports=Property