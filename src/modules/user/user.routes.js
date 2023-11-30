import express  from "express"
    import  * as user  from "./user.controller.js"
const userRouter =express.Router()



userRouter.route('/').
post(user.addUser).
get(user.getAllUser)


userRouter.route('/:id').
get(user.getUserByID).

put(user.updateUser).
delete(user.deleteUser).
patch(user.changeUserPassword)

export default userRouter


