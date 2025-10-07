import { model, Schema } from "mongoose";

/**
 * • name (String, required)
• email (String, Unique, required)
• Password (String, required)
• Phone (String, required)
• age (Number) (Must be between 18 and 60)

 */
const userSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : { 
        type : String , 
        required : true , 
        uniqe : true
    },
    password : {
        type : String , 
        required : true 
    },
    phone : {
        type :String , 
        required : true
    },
    age : {
        type : Number , 
        min : 18 ,
        max : 60
    }
})

export const userModel =  model("user" , userSchema)




