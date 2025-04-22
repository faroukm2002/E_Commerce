export const validate = (schema) => {
    return (req, res, next) => {

        let inputs = { ...req.body, ...req.params, ...req.query }
        // console.log(inputs,"inputs");
        let { error } = schema.validate(inputs, { abortEarly: false });
if (error) {
    
    let errors = error.details.map((detail) => detail.message);
                    res.json(errors);
        } else {
            next()
        }

    }

}
 