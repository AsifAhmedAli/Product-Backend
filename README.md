# Auth Boilerplate with Node

## Description
RESTful API with Node.js, Express, and Mongoose.

## Set the environment variables
replace `.example.env` with `.env`

## Quick Start

To install the dependencies, simply run:

```bash
npm install
```

Then start the server

```bash
npm start
```

<br></br>
## Testing routes
Postman Test Routes: 
  - http://localhost:5000/user/signin  
  - http://localhost:5000/user/signup
 
Protected Route:
> Provide token of logged in user inside "Authorization" header to access the route
  - http://localhost:5000/other
