
import { Schema,Types,model } from "mongoose"
const reviewSchema=new Schema({
    comment:{
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
ratings:{
    type:Number,
    min:1,
    max:5,
    // enum:[1,2,3,4,5]
}
},
{ timestamps: true   } 
) 
    reviewSchema.pre(/^find/,function(){
       this.populate('user', 'name') 
    })
 
export const reviewModel=model('review',reviewSchema)