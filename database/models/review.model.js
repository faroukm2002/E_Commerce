
import { Schema,Types,model } from "mongoose"
const reviewSchema=new Schema({
    text:{
        type:String,
        required:true,
        trim:true,
    },
 
product:{
    type:Schema.ObjectId,
    ref:"product",
    required:true,

},
user:{
    type:Schema.ObjectId,
    ref:"user",
    required:true,

},
rate:{
    type:Number,
    enum:[1,2,3,4,5]
}
},
{ timestamps: true } 
) 


export const reviewModel=model('review',reviewSchema)