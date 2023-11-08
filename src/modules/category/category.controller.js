import slugify from "slugify";
import { categoryModle } from "../../../database/models/category.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/refactor.js";
import { Apifeatures } from "../../utils/Apifeatures.js";





const addCategory= catchError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.name)
  req.body.image=req.file.filename

const category= new categoryModle(req.body)
await category.save()
// created
res.status(201).json({message:"success",category})

})

const getAllCategory= catchError(async(req,res,next)=>{
  // const categories= await categoryModle.find()
  // // created
  // res.status(201).json({message:"success",categories})
  

  let apifeatures= new Apifeatures( categoryModle.find(),req.query)
.pagination().fields().filter().search().sort()

  const results = await apifeatures.mongooseQuery
  res.status(201).json({ message: 'success', page:apifeatures.page, results });

  })



  
  const getcategoryByID= catchError(async(req,res,next)=>{
    const product= await productModel.findById(req.params.id)
    res.status(201).json({message:"success",product})
    
    })


const updateCategory= catchError(async(req,res,next)=>{
  const{id}=req.params
  const {name}=req.body
  req.body.slug=slugify(req.body.name)
  const category= await categoryModle.findByIdAndUpdate(
    id,
    req.body,
    {new:true})
  // created

  // !category && res.status(404).json({message:"category not found",}) 
  !category && next(new AppError('category not found',404))

  category &&   res.status(201).json({message:"success",category})


  }  )
  


  const deleteCategory= deleteOne(categoryModle,'category')

 
export { 
  addCategory,  
  getAllCategory,
  getcategoryByID,
  updateCategory,
  deleteCategory



 }
