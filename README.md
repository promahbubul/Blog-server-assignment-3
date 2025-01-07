# Blog Assignment 3

This is blog website server. Using this server user can register, login. And each user can blog post and manage their blog.

## Feature

- User can register and login
- User can can post and mange their blog.
- Admin can block any user
- Search, Filter any blog

## Technology

- <b>Database:</b> `MongoDB` `Mongoose` . MongoDB is noSQL Database we store our data in mongoDB.
- <b>Backend:</b> `NodeJS` `ExpressJS`. Nodejs in JavaScript runtime and ExpressJS is Nodejs library for make backend server
- <b>DataValidation:</b> `Zod`. Using zod we can check any incoming data is valid or not.
- <b>Others</b>: `bcrypt` `jsonwebtoken` `colors` `dotenv` `cors`

## Prerequisites

- `Nodejs` (Javascript Runtime)
- `MongoDBCompass` (Database)
- `Postman` (API Test)

## Setup

- After Clone this project you need to install all packages. so run this bottom command:

```shell
npm install
```

- create a `.env` file and type your environment . according to bottom

```ts
PORT = Enter your server port number
DATABASE_URI = Enter your database URL with database name
SALT_ROUND = Enter you password hash salt round
JWT_SECRET = Enter here your jwt secret
```

- ### Scripts
- `npm install` install node packages
- `npm start` start nodejs server
- `npm run dev` start nodejs server in development
- `npm run lint` check any error in code
- `npm run lint:fix` check and fix any error in code
- `npm run build` product code build
- `npm run format` code document formate

## API Endpoint Details

We have 3 types of API

- `User`
- `Blog`
- `Admin`

In here our example **`base_url`** `https://blog-assignment-3-six.vercel.app/`

## User API

### Register User

- We can register any user easily.</br>
  POST: `base_url/api/auth/register`

  <u>Request:</u>

  ```ts
  {
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
  }
  ```

  <u>Response:</u>

  ````ts
  {
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
  }```
  ````

### Login User

- For login use this api</br>
  POST: `base_url/api/auth/login`

  <u>Request:</u>

  ```ts
  {
  "email": "john@example.com",
  "password": "securepassword"
  }
  ```

  <u>Response:</u>

  ```ts
  {
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "string"
    }
  }
  ```

## Blog Manage API

### Create a Blog

- New Blog creating .</br>
  POST: `base_url/api/blogs/`

  <u>Request:</u>

  - with header `authorization` token

  ```ts
  {
  "title": "My aFirst Blog",
  "content": "This is the content of my blog."
  }
  ```

  <u>Response:</u>

  ```ts
  {
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
  }
  ```

  ### Update Blog

- logged in use can update their post.</br>
  UPDATE: `base_url/api/blogs/:id`

  <u>Request:</u>

  - with header `authorization` token

  ```ts
  {
  "title": "Updated Blog Title",
  "content": "Updated content."
  }
  ```

  <u>Response:</u>

  ```ts
  {
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": { "details" }
  }
  }
  ```

  ### Delete Blog

- logged in use can Delete their post.</br>
  DELETE: `base_url/api/blogs/:id`

  <u>Request:</u>

  - with header `authorization` token

  <u>Response:</u>

  ```ts
  {
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
  }
  ```

### Get All Blogs

logged in use can Delete their post.</br>
GET: `base_url/api/blogs`

- <u>Query Parameters:</u><br>

  - `search:` Search blogs by title or content
  - `sortBy:` Sort by fields like createdAt or title.
  - `sortOrder:` Sorting order (asc or desc).
  - `filter:` Filter by author ID.

<u>Request</u>

```js
base_url/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId
```

<u>Response:</u>

```ts
{
"success": true,
"message": "Blog deleted successfully",
"statusCode": 200
}
```

## ADMIN API

Admin can block any user and can delete any block.

### Block User

PATCH: `api/admin/users/:userId/block`

<u>Request:</u>

- with header `authorization` token

<u>Response:</u>

```ts
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

### Delete Blog

DELETE: `api/admin/blogs/:id`

<u>Request:</u>

- with header `authorization` token

<u>Response:</u>

```ts
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```
