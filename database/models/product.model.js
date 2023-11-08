  
import { Schema,Types,model } from "mongoose"
const productSchema=new Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:[10,"too short product title"]
    },
    slug:{
        type:String,
       lowercase:true,
    },
price:{
type:Number,
default:0,
min:0,

},

 priceAfterDiscount:{
    type:Number,
    default:0,
    min:0,
    
    },  
      description:{
        type:String,
        required:true,
        trim:true,
        minlength:[10,"too short product description"],
        maxlength:[100,"description should be less tan or equal to 20 characters"]

    },
    stock:{
        type:Number,
        default:0,
        min:0
    },
    sold:{
        type:Number,
        default:0,
        min:0
    }, 
    imgCover:{
        type:String
    },
    images:{
    type:[String]
    },

    category:{
        type:Schema.ObjectId,
        ref:"category",
        required:true,

    },
    subcategory:{
        type:Schema.ObjectId,
        ref:"subCategory",
        required:true,

    },
    brand:{
        type:Schema.ObjectId,
        ref:"brand",
        required:true,

    },
    ratingAvg:{
        type:Number,
        min:1,
        max:5
    },

   rateCount:{
        type:Number,
        min:0,
    },

},
{ timestamps: true } 
)
productSchema.post("init", (doc) => {
    doc.imgCover = process.env.BASE_URL + "product/" + doc.imgCover;
    if (doc.images) doc.images = doc.images.map((path) => process.env.BASE_URL + "product/" + path);
  }); 


export const productModel=model('product',productSchema)