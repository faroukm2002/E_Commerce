import slugify from "slugify";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/refactor.js";
import { productModel } from "../../../database/models/product.model.js";
import { Apifeatures } from "../../utils/Apifeatures.js";





const addproduct= catchError(async(req,res,next)=>{
  req.body.slug=slugify(req.body.title)
  req.body.imgCover=req.files.imgCover[0].filename
  req.body.images = req.files.images.map(ele => ele.filename);

const product= new productModel(req.body)
await product.save()
 
res.status(201).json({message:"success",product})

})

const getAllproduct = catchError(async (req, res, next) => {
  const limit = 4; // Default limit for pagination
  const totalDocuments = await productModel.countDocuments(); // Step 1: Count total documents
  
  let apifeatures= new Apifeatures( productModel.find(),req.query)
.pagination().fields().filter().search().sort()

  const results = await apifeatures.mongooseQuery
  const totalPages = Math.ceil(totalDocuments / limit); // Calculate total pages
  const nextPage = apifeatures.page < totalPages ? apifeatures.page + 1 : null; // Determine next page

  res.status(201).json({ message: 'success',
    currentPage: apifeatures.page,
    numberOfPages: totalPages,
    limit,
    nextPage,
    results, });

// build query
// let mongooseQuery= productModel.find(filterObj);


// execute query
// const products = await mongooseQuery
// res.status(201).json({ message: 'success', page, products });
  // // 1-pagination=========
  // let page_limit = 4;
  // let page = req.query.page * 1 || 1;
  // if (req.query.page <= 0) page = 1;
  // let skip = (page - 1) * page_limit;
                                                      

  // **********************************

  //   // 2-filter===========
//   let filterObj ={...req.query};
//   console.log(filterObj);

//   let excludeQuery=['page','sort','fields','keyword']
//   excludeQuery.forEach((q)=>{
//     delete filterObj[q]
//   })

//   filterObj=JSON.stringify(filterObj)
// filterObj = filterObj.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
// filterObj = JSON.parse(filterObj);


// *********************************

// // 3-sort=======

// if (req.query.sort)
// { 
//   let sortBy = req.query.sort.split(",").join(" "); //["-price","sold"] => -price sold
//   mongooseQuery.sort(sortBy)
// }
// ************************




// 4-search=======

// if (req.query.keyword)
// {
//   mongooseQuery.find({
//     $or:[
//       {title:{$regex:req.query.keyword,$options:'i'}},
//       {description:{$regex:req.query.keyword,$options:'i'}}

//     ]
//   })


// }

// ***************************

// 5-selected fieldes=======

// if (req.query.fields)
// {
//   let fields = req.query.fields.split(",").join(" "); 
//   mongooseQuery.select(fields)
// }

});



  const getproductByID= catchError(async(req,res,next)=>{
    const product= await productModel.findById(req.params.id)
    res.status(201).json({message:"success",product})
    
    })

const updateproduct= catchError(async(req,res,next)=>{
  const{id}=req.params
  // if title exist ....update slug 
  // price عشان كل الحاجات التانيه تشتغل عادي زى    
  if(req.body.title) req.body.slug=slugify(req.body.title)
 
  const product= await productModel.findByIdAndUpdate(
    id,
    req.body,
    {new:true})

  // !product && res.status(404).json({message:"product not found",}) 
  !product && next(new AppError('product not found',404))

  product &&   res.status(201).json({message:"success",product})


  })
  


  const deleteproduct= deleteOne(productModel,'product')

 
export { 
  addproduct,  
  getAllproduct,
  getproductByID,
  updateproduct,
  deleteproduct

 }
