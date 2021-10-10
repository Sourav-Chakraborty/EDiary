//Creating notes model using schema


const mongoose=require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
         type: Schema.Types.ObjectId,
          ref: 'user' 
    },
    title:{
        type:String,
        
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now //don't use () ,so it will called it right now
    }
  });


  module.exports=mongoose.model('notes',NotesSchema)  //creating model using that schema 
   //mongoose.model(name_of_model,schema_structure)

