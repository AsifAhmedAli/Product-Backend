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

### Request Data Sample for Postman Testing
```
  {
    "name": "awais",
    "username": "something",
    "contact": "123456789",
    "email": "awais@gmail.com",
    "password": "51214786",
    "role": "User",
    "starsCount": 50,
    "newPrice": 25000,
    "pricePaid": 1000,
    "newStarsCategoryPrice": 35000,
    "youtubeVideoId": "wjouERPsFso",
    "category": "subscription"
}
```

### Protected Routes
> Provide Token inside "Authorization" header to access the route

> Header Format: `{ Authorization: "Bearer TokenHash" }`
  - **POST** http://localhost:5000/subscription (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/stars/send   (***Request Data***: Authorization-Header, email, starsCount)
  - **POST** http://localhost:5000/stars/buy    (***Request Data***: Authorization-Header, pricePaid)
  - **POST** http://localhost:5000/reward/add    (***Request Data***: Authorization-Header, category)
  - **GET** http://localhost:5000/youtube/generateLink    (***Request Data***: Authorization-Header)

### Dashboard Routes
> All protected with Authorization Token and User Role (Admin)

` User management Routes for admin `
  - **GET** http://localhost:5000/users                 (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/user/disable/:id     (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/user/enable/:id      (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/user/makeadmin/:id   (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/user/removeadmin/:id (***Request Data***: Authorization-Header)


` Price management Routes for admin `

  - **GET** http://localhost:5000/prices                 (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/price/update          (***Request Data***: Authorization-Header,category, newPrice )

` Stars management Routes for admin `

  - **GET** http://localhost:5000/startypes                 (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/startype/update          (***Request Data***: Authorization-Header, category, newStars )

