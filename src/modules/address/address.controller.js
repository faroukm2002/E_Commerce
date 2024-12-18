import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { Apifeatures } from "../../utils/Apifeatures.js";
import { userModel } from "../../../database/models/user.model.js";

const addAddress = catchError(async (req, res, next) => {
  let results = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      // addresses are object >>>>> req.body
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );
  !results && next(new AppError("not found wishList", 404));
  results && res.json({ message: "Done", results:results.addresses });
});



const removeAddress = catchError(async (req, res, next) => {

  let results = await userModel.findByIdAndUpdate(
    req.user._id,

    {
          // addresses are object >>>>> find by id to delete
      $pull: { addresses: {_id: req.body.addresses }},
    },
    { new: true }
  );
  !results && next(new AppError("not found wishList", 401));
  results && res.json({ message: "Done", results: results.addresses });
});



const getAllAddress = catchError(async (req, res, next) => {
  let results = await userModel
    .findOne({ _id: req.user._id })
    .populate("addresses");

  !results && next(new AppError("not found wishList", 401));
  results && res.json({ message: "Done", results:results.addresses });
});

export { 
  addAddress,
  removeAddress,
   getAllAddress };
