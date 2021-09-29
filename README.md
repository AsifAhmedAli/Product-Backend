# Server Node

RestApi for the Product of Mexil Software Solutions with Node & Express

# Pre-requisites

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

# Routes
Postman Test Routes: 
  - http://localhost:5000/user/signin (***Request Data***: email, password)  
  - http://localhost:5000/user/signup (***Request Data***: name, username, email, password, contact)

### protected Routes
> Provide Token inside "Authorization" header to access the route

> Header Format: `{ Authorization: "Bearer TokenHash" }`
  - http://localhost:5000/subscription (***Request Data***: Authorization-Header)
  - http://localhost:5000/stars/send   (***Request Data***: Authorization-Header, email, starsCount)
  - http://localhost:5000/stars/buy    (***Request Data***: Authorization-Header, pricePaid)
  - http://localhost:5000/reward/add    (***Request Data***: Authorization-Header, category)
  - http://localhost:5000/youtube/generateLink    (***Request Data***: Authorization-Header)
  - http://localhost:5000/other        (***Request Data***: )
