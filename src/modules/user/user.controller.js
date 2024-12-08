import slugify from "slugify";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/refactor.js";
import { Apifeatures } from "../../utils/Apifeatures.js";
import { userModel } from "../../../database/models/user.model.js";





const addUser= catchError(async(req,res,next)=>{
  let users=await userModel.findOne({email:req.body.email})
  if(users) return next(new AppError("duplicate email",409))
const User= new userModel(req.body)
await User.save()
// created
res.status(201).json({message:"success",User})

})




const getAllUser= catchError(async(req,res,next)=>{
  let apifeatures= new Apifeatures( userModel.find(),req.query)
  .pagination().fields().filter().search().sort()
  
    const users = await apifeatures.mongooseQuery
    res.status(201).json({ message: 'success', page:apifeatures.page, users });
  
  })


  const getUserByID= catchError(async(req,res,next)=>{
    const user= await userModel.findById(req.params.id)
    res.status(201).json({message:"success",user})
     
    })
 

const updateUser= catchError(async(req,res,next)=>{
  const{id}=req.params
   const User= await userModel.findByIdAndUpdate(
    id,
    req.body,
    {new:true})
  // created

  // !User && res.status(404).json({message:"User not found",}) 
  !User && next(new AppError('User not found',404))

  User &&   res.status(201).json({message:"success",User})


  }  )
  


// user or admin can change password
  const changeUserPassword= catchError(async(req,res,next)=>{
    const{id}=req.params
    req.body.changePasswordAt = Date.now();
  console.log(req.body.changePasswordAt);
    const User= await userModel.findByIdAndUpdate(
      id,
       req.body,
      {new:true})
    // created
  
    // !User && res.status(404).json({message:"User not found",}) 
    !User && next(new AppError('User not found',404))
  
    User &&   res.status(201).json({message:"success",User})
  
  
    }  )


    
  

  const deleteUser= deleteOne(userModel,'User')

 
export { 
  addUser,  
  getAllUser,
  getUserByID,
  updateUser,
  deleteUser,
  changeUserPassword



 }
