const mongoose = require('mongoose');
const { Schema } = mongoose
const FormSchema  = new Schema({
        name: {
            type:String,
            required:true
        }, 
        email: {
            type:String,
            required:true,

        }, 
        phone: {
            type:String,
            required:true,

        }, 
        company: {
            type:String,
            required:true,

        }, 
        role: {
            type:String,
            required:true,

        }, 
        resume: {
            type:String,
            required:true,

        }, 
        date: {
            type:Date,
            default:Date.now
        }, 
      

    });
 
module.exports=mongoose.model('form',FormSchema);