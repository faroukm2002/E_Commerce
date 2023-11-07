import { globalError } from "./middleware/globalErrorMiddleware.js"
import brandRouter from "./modules/brand/brand.routes.js"
import categoryRouter from "./modules/category/category.routes.js"
import productRouter from "./modules/product/product.routes.js"
import subCategoryRouter from "./modules/subcategory/subcategory.routes.js"

import { AppError } from "./utils/AppError.js"


export function bootstrap(app){

    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/api/v1/categories',categoryRouter)
    app.use('/api/v1/subcategories',subCategoryRouter)
    app.use('/api/v1/brands',brandRouter)
    app.use('/api/v1/products',productRouter)





// url error
app.use("*",(req,res,next)=>{
    next(new AppError(`invalid url ${req.originalUrl}`,404))
})


// globalError
app.use(globalError)

}