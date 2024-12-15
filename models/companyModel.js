import mongoose from 'mongoose';

const companySchema=new mongoose.Schema({
    logo:{
        type:String,
        required:true,
       
    },
    name:{
        type:String,
        required:true,
        unique:true
    },
    location:String, 
    industry:String,
    role:{
        type:String,
        enum:['Admin','Student'],
        required:true
    },
    question:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Questions',
        }
    ]
    
})

const companyModel=mongoose.model("Company",companySchema);

export default companyModel;