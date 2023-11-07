export const globalError= (err,req,res,next)=>{
    console.log(err)
    process.env.MODE == "devlopment"? res.status(err.statusCode).json({err:err.message,stack:err.stack}): res.status(err.statusCode).json({err:err.message})

   
}     