# SoBook Reservation Backend
This project is not open to contribution.

## Description
You will find here controllers, middleware, models for backend. 

## Features
- CRUD 
- Authentication

## Tech Stack 
- Node.js
- Express.js
- Javascript
- Backpack-core
- Bcryptjs
- Dotenv
- Jsonwebtoken
- Mongoose
- Nodemon
- Cors

## Getting Started
1. Clone the repository
2. Install dependencies by using `npm install`
3. Create your own `.env`
4. Run the application by using `npm run dev`

## Deployment Options with Vercel

## Description
each time Github is updated, Vercel will automatically run to the latest version of the application

## Features
1. In `package.json`, in `scripts` section : `build": "backpack build`
2. `vercel.json` : 
`{`
  `"version": 2,`
  `"builds": [`
    `{`
      `"src": "src/index.js",`
      `"use": "@vercel/node"`
    `}`
  `],`
  `"rewrites": [{ "source": "/(.*)", "destination": "src/" }]`
  
`}`
3. Dont forget to import `.env`in the `variable` of Vercel

# VERCEL Documentation
[https://vercel.com/docs](https://vercel.com/docs)



