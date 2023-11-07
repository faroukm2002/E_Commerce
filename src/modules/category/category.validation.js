import Joi from "joi";


const addCategoryValidation=Joi.object({
    name:Joi.string().min(3).max(30).required()
})


const updateCategoryValidation=Joi.object({
    name:Joi.string().min(3).max(30).required(),
    id:Joi.string().hex().length(24).required()
})
const deleteCategoryValidation=Joi.object({
    id:Joi.string().hex().length(24).required()
})
export{
    addCategoryValidation,
    updateCategoryValidation,
    deleteCategoryValidation
}