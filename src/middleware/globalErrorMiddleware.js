
// // nourhaaan
// export const globalError= (err,req,res,next)=>{
//     console.log(err)
//     process.env.MODE == "development"? 
//     res.status(err.statusCode).json({err:err.message,stack:err.stack})
//     : res.status(err.statusCode).json({err:err.message})
// }
   

// m3tiiiiiiiii

     export const globalError= (err,req,res,next)=>{
    let error = err.message
    let code=err.statusCode || 500
    process.env.MODE == "development"
      ? res.status(code).json({ error, stack: err.stack })
      : res.status(code).json({ error });

   
}      