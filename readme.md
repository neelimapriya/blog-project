# Blog Project Backend

## Overview
This project was developed as a backend for a blogging platform with two user roles: **Admin** and **User**. It includes secure authentication, role-based access control, and a public API for reading blogs with search, sort, and filter functionalities.

## Technologies Used
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)

## Features

### 1. User Roles
#### Admin:
- Created manually in the database with predefined credentials.
- Can delete any blog.
- Can block users by updating the `isBlocked` property.
- Cannot update any blog.

#### User:
- Can register and log in.
- Can create, update, and delete their own blogs.
- Cannot perform admin actions.

### 2. Authentication & Authorization
- **Authentication**: Users must log in to perform blog creation, update, and deletion.
- **Authorization**: Admin and user roles are secured and differentiated.

### 3. Blog API
- Public API for reading blogs:
  - Displays title, content, author details, etc.
  - Supports **search**, **sorting**, and **filtering** functionalities.

## Models

### User Model
```javascript
{
  name: string,
  email: string,
  password: string,
  role: "admin" | "user", // Default: "user"
  isBlocked: boolean, // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Model
```javascript
{
  title: string,
  content: string,
  author: ObjectId, // Reference to User model
  isPublished: boolean, // Default: true
  createdAt: Date,
  updatedAt: Date
}
```
## API Endpoints

### 1. Authentication
#### Register User
- **POST** `/api/auth/register`
- Registers a new user.

#### Login User
- **POST** `/api/auth/login`
- Authenticates a user and returns a JWT token.

### 2. Blog Management
#### Create Blog
- **POST** `/api/blogs`
- Allows logged-in users to create a blog.

#### Update Blog
- **PATCH** `/api/blogs/:id`
- Allows users to update their own blog.

#### Delete Blog
- **DELETE** `/api/blogs/:id`
- Allows users to delete their own blog.

#### Get All Blogs (Public)
- **GET** `/api/blogs`
- Fetches all blogs with optional **search**, **sort**, and **filter** functionalities.

### 3. Admin Actions
#### Block User
- **PATCH** `/api/admin/users/:userId/block`
- Allows admin to block a user.

#### Delete Blog
- **DELETE** `/api/admin/blogs/:id`
- Allows admin to delete any blog.

## How to Run
1. Clone the repository `https://github.com/neelimapriya/blog-project.git`.
2. Install dependencies: `npm install`.
3. Set up a MongoDB database and configure the `.env` file.
4. Run the server: `npm start`.