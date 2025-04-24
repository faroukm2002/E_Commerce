
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

//  priceAfterDiscount:{
//     type:Number,
//     default:0,
//     min:0,
    
//     },  
      description:{
        type:String,
        required:true,
        trim:true,
        minlength:[10,"too short product description"],
        maxlength:[300,"description should be less tan or equal to 300 characters"]

    },
    // stock:{
    //     type:Number,
    //     default:0,
    //     min:0
    // },
    quantity:{
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
    images:[String],
   

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
{ timestamps: true,toJSON: { virtuals: true },toObject: { virtuals: true } } 
)

productSchema.post("init", (doc) => {
    if (doc.imgCover && doc.images) {
    //   console.log('imgCover URL:', process.env.BASEURL + "product/" + encodeURIComponent(doc.imgCover));
    //   console.log('images URL:', doc.images.map((path) => process.env.BASEURL + "product/" + encodeURIComponent(path)));
      
      doc.imgCover = process.env.BASEURL + "/product/" + encodeURIComponent(doc.imgCover);
      doc.images = doc.images.map((path) => process.env.BASEURL + "/product/" + encodeURIComponent(path));
    }
  });
  
  
 
//   virtuea populate
  productSchema.virtual('myReviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
  });
  productSchema.pre(/^find/,function(){
    this.populate('myReviews') 
 })


export const productModel=model('product',productSchema)