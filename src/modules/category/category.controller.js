import slugify from "slugify";
import { categoryModle } from "../../../database/models/category.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/refactor.js";
import { Apifeatures } from "../../utils/Apifeatures.js";





const addCategory= catchError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.name)
  req.body.image=req.file.filename
  // console.log(req.file)
const existCategory=await categoryModle.findOne({name:req.body.name})
if (existCategory) return next(new AppError("Category name already exists", 400));

const category= new categoryModle(req.body)
await category.save()
// created
res.status(201).json({message:"success",category})

})

const getAllCategory= catchError(async(req,res,next)=>{
  // const categories= await categoryModle.find()
  // // created
  // res.status(201).json({message:"success",categories})
    const limit = 4; // Default limit for pagination
    const totalDocuments = await categoryModle.countDocuments(); // Step 1: Count total documents
    

  let apifeatures= new Apifeatures( categoryModle.find(),req.query)
.pagination().fields().filter().search().sort()

  const results = await apifeatures.mongooseQuery;
  const totalPages = Math.ceil(totalDocuments / limit); // Calculate total pages
  const nextPage = apifeatures.page < totalPages ? apifeatures.page + 1 : null; // Determine next page

  res
    .status(201)
    .json({
      message: "success",
      currentPage: apifeatures.page,
      numberOfPages: totalPages,
      limit,
      nextPage,
      results,
    });

  }) 

 

  
  const getcategoryByID= catchError(async(req,res,next)=>{
    const product = await categoryModle.findById(req.params.id);
    res.status(201).json({message:"success",product})
    
    })


const updateCategory= catchError(async(req,res,next)=>{
  const{id}=req.params
   if (req.body.name) req.body.slug = slugify(req.body.name);
  const category= await categoryModle.findByIdAndUpdate(
    id,
    req.body,
    {new:true})
  // created

  // !category && res.status(404).json({message:"category not found",})
  // !null = true
  // if true >> print 
  !category && next(new AppError('category not found', 404))
  // !{}==false 
  // if false >> print 
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
