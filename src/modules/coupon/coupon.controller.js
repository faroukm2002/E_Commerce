import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/refactor.js";
import { Apifeatures } from "../../utils/Apifeatures.js";
import { couponModel } from "../../../database/models/coupon.model.js";
import qrcode from 'qrcode'




const addCoupon= catchError(async(req,res,next)=>{
 
  const Coupon= new couponModel(req.body)
await Coupon.save()
// created
res.status(201).json({message:"success",Coupon})

})

const getAllCoupon= catchError(async(req,res,next)=>{


  let apifeatures= new Apifeatures( couponModel.find(),req.query)
  .pagination().fields().filter().search().sort()
  
    const results = await apifeatures.mongooseQuery
    res.status(201).json({ message: 'success', page:apifeatures.page, results });
  
  })


  const getCouponByID= catchError(async(req,res,next)=>{
    const result= await couponModel.findById(req.params.id)
    let url =await qrcode.toDataURL(result.code)
    res.status(201).json({message:"success",result,url})
    
    })


const updateCoupon= catchError(async(req,res,next)=>{
   let { id } = req.params; // id Coupon 
  const Coupon= await couponModel.findOneAndUpdate( id,req.body,{new:true})
    
    
   
  // created

  // !Coupon && res.status(404).json({message:"Coupon not found",}) 
  !Coupon && next(new AppError('Coupon not found or you are not autherized to perform this action',404))

  Coupon &&   res.status(201).json({message:"success",Coupon})


  }  )


  const deleteCoupon= deleteOne(couponModel,'Coupon')

 
export { 
  addCoupon,  
  getAllCoupon,
  getCouponByID,
  updateCoupon,
  deleteCoupon



 }
