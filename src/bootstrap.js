import authRouter from "./modules/auth/auth.routes.js";
import { globalError } from "./middleware/globalErrorMiddleware.js";
import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import productRouter from "./modules/product/product.routes.js";
import subCategoryRouter from "./modules/subcategory/subcategory.routes.js";
import userRouter from "./modules/user/user.routes.js";
import { AppError } from "./utils/AppError.js";
import reviewRouter from "./modules/review/review.routes.js";
import wishlistRouter from "./modules/wishlist/wishlist.routes.js";
import addressRouter from "./modules/address/address.routes.js";
import couponRouter from "./modules/coupon/coupon.routes.js";
import cartRouter from "./modules/cart/cart.routes.js";
import orderRouter from "./modules/order/order.routes.js";

export function bootstrap(app) {
  app.get("/", (req, res) => res.send("Welcome to e-Commerce!"));
  
  app.use("/api/v1/categories", categoryRouter);
  app.use("/api/v1/subcategories", subCategoryRouter);
  app.use("/api/v1/brands", brandRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/review", reviewRouter);
  app.use("/api/v1/wishlist", wishlistRouter);
  app.use("/api/v1/address", addressRouter);
  app.use("/api/v1/coupons", couponRouter);
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/order", orderRouter);

  // Handle invalid URLs
  app.use("*", (req, res, next) => {
    next(new AppError(`Invalid URL ${req.originalUrl}`, 404));
  });

  // Global Error Handling Middleware
  app.use(globalError);
}
