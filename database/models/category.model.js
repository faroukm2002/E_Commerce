import { Schema,model } from "mongoose"
const categorySchema=new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[2,"too short category name"]
    },
    slug:{
        type:String,
       lowercase:true,
    },
    image:{
        type:String,
        // required:true
    }


},
    { timestamps: true } 
)


export const categoryModle=model('category',categorySchema)

