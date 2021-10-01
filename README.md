# Product Node API

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
### User Routes 
  - **POST** http://localhost:5000/user/signin (***Request Data***: email, password)  
  - **POST** http://localhost:5000/user/signup (***Request Data***: name, username, email, password, contact)

### Protected Routes
> Provide Token inside "Authorization" header to access the route

> Header Format: `{ Authorization: "Bearer TokenHash" }`
  - **POST** http://localhost:5000/subscription (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/stars/send   (***Request Data***: Authorization-Header, email, starsCount)
  - **POST** http://localhost:5000/stars/buy    (***Request Data***: Authorization-Header, pricePaid)
  - **POST** http://localhost:5000/reward/add    (***Request Data***: Authorization-Header, category)
  - **GET** http://localhost:5000/youtube/generateLink    (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/other        (***Request Data***: )

### Dashboard Routes
> All protected with Authorization Token and User Role (Admin)

  - **GET** http://localhost:5000/users
  - **POST** http://localhost:5000/user/disable/:id
  - **POST** http://localhost:5000/user/enable/:id
  - **POST** http://localhost:5000/user/makeadmin/:id
  - **POST** http://localhost:5000/user/removeadmin/:id
