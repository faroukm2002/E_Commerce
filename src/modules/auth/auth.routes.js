import express  from "express"
    import  * as auth  from "./auth.controller.js"
const authRouter =express.Router()



authRouter.post('/signUp',auth.signUp)
authRouter.post('/signIn',auth.signIn)
authRouter.post("/refresh-token", auth.refreshToken);
authRouter.patch("/forgetPassword", auth.forgetPassword);
authRouter.patch('/sendCode',auth.sendCode)

export default authRouter


