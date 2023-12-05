import authRouter from "./modules/auth/auth.routes.js"
import { globalError } from "./middleware/globalErrorMiddleware.js"
import brandRouter from "./modules/brand/brand.routes.js"
import categoryRouter from "./modules/category/category.routes.js"
import productRouter from "./modules/product/product.routes.js"
import subCategoryRouter from "./modules/subcategory/subcategory.routes.js"
import userRouter from "./modules/user/user.routes.js"

import { AppError } from "./utils/AppError.js"
import reviewRouter from "./modules/review/review.routes.js"
import wishlistRouter from "./modules/wishlist/wishlist.routes.js"
import addressRouter from "./modules/address/address.routes.js"
import couponRouter from "./modules/coupon/coupon.routes.js"


export function bootstrap(app){

    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subcategories',subCategoryRouter)
    app.use('/api/v1/brands',brandRouter)
    app.use('/api/v1/products',productRouter)

    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/review',reviewRouter)
    app.use('/api/v1/wishlist',wishlistRouter)
    app.use('/api/v1/address',addressRouter)
    app.use('/api/v1/coupons',couponRouter)




// url error
app.use("*",(req,res,next)=>{
    next(new AppError(`invalid url ${req.originalUrl}`,404))
})


// globalError
app.use(globalError)

}