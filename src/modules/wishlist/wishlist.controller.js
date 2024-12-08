import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { userModel } from "../../../database/models/user.model.js";

const addToWishList = catchError(async (req, res, next) => {
  let { product } = req.body;
  let results = await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishList: product },
    },
    { new: true }
  );
  !results && next(new AppError("not found wishList", 404));
  results && res.json({ message: "Done", results: results.wishList });
});



const removeWishList = catchError(async (req, res, next) => {
  let { product } = req.body;

  let results = await userModel.findByIdAndUpdate(
    req.user._id,

    {
      $pull: { wishList: product },
    },
    { new: true }
  );
  !results && next(new AppError("not found wishList", 401));
  results && res.json({ message: "Done", results });
});



const getAllWishList = catchError(async (req, res, next) => {
  let results = await userModel
    .findById( req.user._id )
    // .populate("wishList");

  !results && next(new AppError("not found wishList", 401));
  results && res.json({ message: "Done", results: results.wishList });
});

export { 
  addToWishList,
   removeWishList,
    getAllWishList };
