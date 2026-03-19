import mongoose, { Schema } from "mongoose";

//1- create a schema
//2 - create a model based of schema

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required:true 
    }, 
},
{timestamps:true }
); //will give createdAt, and updatedAt by default

const Note = mongoose.model("Note", noteSchema);
export default Note