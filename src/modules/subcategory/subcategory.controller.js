import slugify from "slugify";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { subCategoryModel } from "../../../database/models/subcategory.model .js";
import { deleteOne } from "../handlers/refactor.js";
import { Apifeatures } from "../../utils/Apifeatures.js";





const addsubCategory= catchError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.name)
const subCategory= new subCategoryModel(req.body)
await subCategory.save()
// created
res.status(201).json({message:"success",subCategory})

})

const getAllsubCategory= catchError(async(req,res,next)=>{
    let filter={}
  if(req.params.categoryId){
    filter={category:req.params.categoryId}
  }
  // const subcategories= await subCategoryModel.find(filter)
  // // created
  // res.status(201).json({message:"success",subcategories})
  
  let apifeatures= new Apifeatures( subCategoryModel.find(),req.query)
  .pagination().fields().filter().search().sort()
  
    const results = await apifeatures.mongooseQuery
    res.status(201).json({ message: 'success', page:apifeatures.page, results });
  
  })


  const getsubcategoryByID= catchError(async(req,res,next)=>{
    const product= await productModel.findById(req.params.id)
    res.status(201).json({message:"success",product})
    
    })


const updatesubCategory= catchError(async(req,res,next)=>{
  const{id}=req.params
 
    if(req.body.name)  req.body.slug=slugify(req.body.name)
  const subCategory= await subCategoryModel.findByIdAndUpdate(
    id,
    req.body,
    {new:true})
  // created

  // !subCategory && res.status(404).json({message:"subCategory not found",}) 
  !subCategory && next(new AppError('subCategory not found',404))

  subCategory &&   res.status(201).json({message:"success",subCategory})


  }  )
  


  const deletesubCategory= deleteOne(subCategoryModel,'subcategory')

 
export { 
  addsubCategory,  
  getAllsubCategory,
  getsubcategoryByID,
  updatesubCategory,
  deletesubCategory



 }
