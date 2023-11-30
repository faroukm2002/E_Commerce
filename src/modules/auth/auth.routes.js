import express  from "express"
    import  * as auth  from "./auth.controller.js"
const authRouter =express.Router()



authRouter.post('/signUp',auth.signUp)
authRouter.post('/signIn',auth.signIn)


// brandRouter.route('/:id').
// get(brand.getbrandByID).

// put(brand.updatebrand).
// delete(brand.deletebrand)

export default authRouter


