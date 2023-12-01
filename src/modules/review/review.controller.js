import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/refactor.js";
import { Apifeatures } from "../../utils/Apifeatures.js";
import { reviewModel } from "../../../database/models/review.model.js";





const addReview= catchError(async(req,res,next)=>{
  req.body.user=req.user._id
 
  let isReview=await reviewModel.findOne({user:req.user._id,product:req.body.product})
  if(isReview)return next(new AppError('you created review before',409))
  const Review= new reviewModel(req.body)
await Review.save()
// created
res.status(201).json({message:"success",Review})

})

const getAllReview= catchError(async(req,res,next)=>{


  let apifeatures= new Apifeatures( reviewModel.find(),req.query)
  .pagination().fields().filter().search().sort()
  
    const results = await apifeatures.mongooseQuery
    res.status(201).json({ message: 'success', page:apifeatures.page, results });
  
  })


  const getReviewByID= catchError(async(req,res,next)=>{
    const product= await productModel.findById(req.params.id)
    res.status(201).json({message:"success",product})
    
    })


const updateReview= catchError(async(req,res,next)=>{
   // lazem akon ana elly 3mlt review 
   let { id } = req.params; // id review 
   // user .... req.user._id
  const Review= await reviewModel.findOneAndUpdate( {_id:id,user:req.user._id},req.body,{new:true})
    
    
   
  // created

  // !Review && res.status(404).json({message:"Review not found",}) 
  !Review && next(new AppError('Review not found or you are not autherized to perform this action',404))

  Review &&   res.status(201).json({message:"success",Review})


  }  )


  const deleteReview= deleteOne(reviewModel,'Review')

 
export { 
  addReview,  
  getAllReview,
  getReviewByID,
  updateReview,
  deleteReview



 }
