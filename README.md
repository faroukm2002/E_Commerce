# E-Commerce Backend

Welcome to the **E-Commerce Backend**, an advanced server-side application that provides a robust foundation for building a comprehensive e-commerce platform. This backend system is designed to facilitate seamless online shopping experiences, from product browsing to checkout and order fulfillment.

![E-Commerce Backend Overview](https://static.startuptalky.com/2022/04/Backend-Development-E-commerce-website-StartupTalky.jpg)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Address Management](#address-management)
  - [Brand Management](#brand-management)
  - [Cart Management](#cart-management)
  - [Category Management](#category-management)
  - [Coupon Management](#coupon-management)
  - [Order Management](#order-management)
  - [Product Management](#product-management)
  - [Review Management](#review-management)
  - [Subcategory Management](#subcategory-management)
  - [User Management](#user-management)
  - [Wishlist Management](#wishlist-management)
- [Contributing](#contributing)
- [Licensing](#licensing)
- [Contact](#contact)


## Project Overview

Our e-commerce backend is a **Node.js** application that leverages **Express.js** for creating a structured, scalable, and efficient RESTful API. The system is backed by **MongoDB**, a NoSQL database, to ensure high performance and flexible data handling for e-commerce operations.

## Features

- **User Authentication and Authorization:** Secure sign-up and sign-in processes with role-based access control.
- **Product Management:** CRUD operations for products.
- **Order Processing:** Streamlined order management system.
- **Shopping Cart:** Persistent cart functionality.
- **Payments Integration:** Integration with payment gateways like Stripe.
- **Discounts and Coupons:** Dynamic coupon system.
- **Reviews and Ratings:** Community engagement through product reviews.
- **Wishlist:** Manage and bookmark favorite items.
- **Scalable Architecture:** Designed for scalability and performance.

## Prerequisites

- **Node.js** (v18.12.0 or higher)
- **MongoDB** (Running on the default port)
- **npm** (for dependency management)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/faroukm2002/E_Commerce.git
cd E_Commerce
npm install
```
Set up your environment variables in a .env file:

```
MODE=devlopment
MONGO_URL=mongodb://127.0.0.1:27017/E-commerce_2
BASE_URL=http://localhost:3000/
```
## Running the Server

```
npm start
```

## API Endpoints

### Authentication
- **POST** `/signup`: Register a new user.
- **POST** `/signin`: Login for existing users.

### Address Management
- **PATCH** `/address`: Update an address for a user.
- **DELETE** `/address`: Remove an address for a user.
- **GET** `/address`: Retrieve all addresses for a user.

### Brand Management
- **POST** `/brand`: Add a new brand (admin).
- **GET** `/brand`: List all brands.
- **PUT** `/brand/:id`: Update a brand (admin).
- **DELETE** `/brand/:id`: Delete a brand (admin).

### Cart Management
- **POST** `/cart`: Add a product to the cart.
- **GET** `/cart`: Get the user's cart.
- **POST** `/cart/apply-coupon`: Apply a coupon to the cart.
- **DELETE** `/cart/:id`: Remove a product from the cart.
- **PUT** `/cart/:id`: Update product quantity in the cart.

### Category Management
- **POST** `/category`: Add a new category (admin).
- **GET** `/category`: List all categories.
- **PUT** `/category/:id`: Update a category (admin).
- **DELETE** `/category/:id`: Delete a category (admin).

### Coupon Management
- **POST** `/coupon`: Create a new coupon (admin/user).
- **GET** `/coupon`: List all coupons.
- **PUT** `/coupon/:id`: Update a coupon (admin/user).
- **DELETE** `/coupon/:id`: Delete a coupon (admin/user).
- **GET** `/coupon/:id`: Retrieve a specific coupon.

### Order Management
- **POST** `/order/:id`: Create a cash order (user).
- **GET** `/order`: Get a specific order (user).
- **POST** `/order/checkOut/:id`: Create a checkout session (user).
- **GET** `/order/all`: List all orders.

### Product Management
- **POST** `/product`: Add a new product (admin/user).
- **GET** `/product`: List all products.
- **PUT** `/product/:id`: Update a product (admin).
- **DELETE** `/product/:id`: Delete a product (admin).
- **GET** `/product/:id`: Retrieve a specific product.

### Review Management
- **POST** `/review`: Add a new review (user).
- **GET** `/review`: List all reviews.
- **PUT** `/review/:id`: Update a review (user).
- **DELETE** `/review/:id`: Delete a review (admin/user).

### Subcategory Management
- **POST** `/subcategory`: Add a new subcategory (admin/user).
- **GET** `/subcategory`: List all subcategories.
- **PUT** `/subcategory/:id`: Update a subcategory (admin/user).
- **DELETE** `/subcategory/:id`: Delete a subcategory (admin/user).

### User Management
- **POST** `/user`: Add a new user.
- **GET** `/user`: List all users.
- **PUT** `/user/:id`: Update a user.
- **DELETE** `/user/:id`: Delete a user.
- **PATCH** `/user/:id`: Change a user's password.

### Wishlist Management
- **PATCH** `/wishlist`: Add to wishlist (user).
- **DELETE** `/wishlist`: Remove from wishlist (user).
- **GET** `/wishlist`: Get all items in a user's wishlist.

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your features or fixes.

## Licensing

This project is licensed under the ISC License. See the LICENSE file for details.

## Contact

For any questions or feedback, feel free to reach out:

- **Email:** [faroukm238@gmail.com](mailto:faroukm238@gmail.com)
- **LinkedIn:** [Farouk Mohamed](https://www.linkedin.com/in/farouk-mohamed-87315b298/)


