import slugify from "slugify";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/refactor.js";
import { Apifeatures } from "../../utils/Apifeatures.js";





const addbrand= catchError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.name)
const brand= new brandModel(req.body)
await brand.save()
// created
res.status(201).json({message:"success",brand})

})

const getAllbrand= catchError(async(req,res,next)=>{
  // const brands= await brandModel.find()
  // // created
  // res.status(201).json({message:"success",brands})


  let apifeatures= new Apifeatures( brandModel.find(),req.query)
  .pagination().fields().filter().search().sort()
  
    const results = await apifeatures.mongooseQuery
    res.status(201).json({ message: 'success', page:apifeatures.page, results });
  
  })


  const getbrandByID= catchError(async(req,res,next)=>{
    const brand= await brandModel.findById(req.params.id)
    res.status(201).json({message:"success",brand})
    
    })


const updatebrand= catchError(async(req,res,next)=>{
  const{id}=req.params
  req.body.slug=slugify(req.body.name)
  const brand= await brandModel.findByIdAndUpdate(
    id,
    req.body,
    {new:true})
  // created

  // !brand && res.status(404).json({message:"brand not found",}) 
  !brand && next(new AppError('brand not found',404))

  brand &&   res.status(201).json({message:"success",brand})


  }  )
  


  const deletebrand= deleteOne(brandModel,'brand')

 
export { 
  addbrand,  
  getAllbrand,
  getbrandByID,
  updatebrand,
  deletebrand



 }
