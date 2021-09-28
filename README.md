# Server Node

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
## Testing Routes
Postman Test Routes: 
  - http://localhost:5000/user/signin  
  - http://localhost:5000/user/signup

### protected Routes
> Provide Token inside "Authorization" header to access the route
  - http://localhost:5000/subscription
  - http://localhost:5000/stars/send
  - http://localhost:5000/other
