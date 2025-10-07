/**• title (String, required)
• content (String, required)
• userId (ref to Users, required)
• createdAt (Timestamp)
• updatedAt (Timestamp)
 */

import { model, Schema, Types } from "mongoose";


const noteSchema = new Schema ({
    title : {
        type : String , 
        required : true ,
        vlaidate : {
            validator : function(value){
                return value !== value.toUpperCase();
            },
            message: "the title must not be entirely uppercase"
        }
    },
    content : {
        type: String , 
        required : true
    },
    userId : {
        type :Types.ObjectId,
       ref : "user"  ,
       required : true
    }
},{
    timestamps : true
})

export const noteModel = model('note' , noteSchema)