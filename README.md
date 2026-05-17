# E-Commerce Order Analysis API

A Node.js + Express + MongoDB API for managing users, products, orders, and analytics for an e-commerce system.

## Features

* Create users
* Create products
* Create orders
* Get top selling products
* Get monthly revenue
* Get user purchase summary

## Tech Stack

* Node.js
* Express
* MongoDB
* Mongoose
* TypeScript

## Project Structure

```txt
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── app.ts
└── server.ts
```

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
```

## Run the Project

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

## API Endpoints

### 1) Create User

**POST** `/api/users/signup`

Request body:

```json
{
  "email": "test@gmail.com",
  "name": "test"
}
```

cURL:

```bash
curl -X POST 'http://localhost:3000/api/users/signup' \
  --header 'Content-Type: application/json' \
  --data '{
    "email":"lol@gmail.comam7",
    "name":"lol"
  }'
```

### 2) Create Product

**POST** `/api/products/create-product`

Request body:

```json
{
  "name": "Iphone",
  "category": "Mobile",
  "price": 1000
}
```

cURL:

```bash
curl -X POST 'http://localhost:3000/api/products/create-product' \
  --header 'Content-Type: application/json' \
  --data '{
    "name":"Iphone",
    "category":"Mobile",
    "price":1000
  }'
```

### 3) Create Order

**POST** `/api/orders/create-order`

Request body:

```json
{
  "userId": "6a09af3458cd3dfd986b6bda",
  "products": [
    {
      "productId": "6a09af4158cd3dfd986b6bdc",
      "quantity": 30
    },
    {
      "productId": "6a09a76953f98616e5bb56c3",
      "quantity": 10
    },
    {
      "productId": "6a09ae2258cd3dfd986b6bcd",
      "quantity": 10
    }
  ]
}
```

cURL:

```bash
curl -X POST 'http://localhost:3000/api/orders/create-order' \
  --header 'Content-Type: application/json' \
  --data '{
    "userId":"6a09af3458cd3dfd986b6bda",
    "products":[
      {
        "productId":"6a09af4158cd3dfd986b6bdc",
        "quantity":30
      },
      {
        "productId":"6a09a76953f98616e5bb56c3",
        "quantity":10
      },
      {
        "productId":"6a09ae2258cd3dfd986b6bcd",
        "quantity":10
      }
    ]
  }'
```

### 4) Top Selling Products

**GET** `/api/analytics/top-products`

cURL:

```bash
curl 'http://localhost:3000/api/analytics/top-products'
```

### 5) User Purchase Summary

**GET** `/api/analytics/user-purchase-summary/:userId`

Example:

```bash
curl 'http://localhost:3000/api/analytics/user-purchase-summary/6a09af3458cd3dfd986b6bda'
```

### 6) Monthly Revenue

**GET** `/api/analytics/monthly-revenue`

cURL:

```bash
curl 'http://localhost:3000/api/analytics/monthly-revenue'
```

## Notes

* Top selling products and monthly revenue are calculated from order data stored in MongoDB.
* The order total should be calculated from product prices in the database, not from client input.
* Use aggregation pipelines with `$unwind`, `$lookup`, `$group`, and date operators where needed.

## Example Data Models

### User

```json
{
  "_id": "ObjectId",
  "name": "Aman",
  "email": "aman@test.com"
}
```

### Product

```json
{
  "_id": "ObjectId",
  "name": "iPhone 15",
  "category": "Mobile",
  "price": 80000
}
```

### Order

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "products": [
    {
      "productId": "ObjectId",
      "quantity": 2
    }
  ],
  "totalAmount": 160000,
  "status": "completed",
  "createdAt": "Date"
}
```
