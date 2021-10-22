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
    "name": "kazmi",
    "username": "ahmads180372",
    "contact": "631412323",
    "email": "awais@gmail.com",
    "password": "51214786",
    "role": "User",
    "starsCount": 1000,
    "newPrice": 25000,
    "pricePaid": 2000,
    "newStarsCategoryPrice": 35000,
    "youtubeVideoId": "wjouERPsFso",
    "category": "somethingnew",
    "title": "Mexil Corportate",
    "description": "We provide flexible solutions",
    "starsRequired": 200,
    "starsReward": 3000,
    "recieverEmail": "ahmad@gmail.com"
}
```

### User Routes
> Provide Token inside "Authorization" header to access the route

> Header Format: `{ Authorization: "Bearer TokenHash" }`
  - **POST** http://localhost:5000/subscription (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/stars/send   (***Request Data***: Authorization-Header, email, starsCount)
  - **POST** http://localhost:5000/stars/buy    (***Request Data***: Authorization-Header, pricePaid)
  - **POST** http://localhost:5000/reward/add    (***Request Data***: Authorization-Header, category)
  - **GET** http://localhost:5000/youtube/generateLink    (***Request Data***: Authorization-Header)

` Survey management Routes for Admin and User `

  - **POST** http://localhost:5000/survey/add             (For Admin to create Survey)  (***Request Data***: Authorization-Header, title, description, mcqs(array of objects))
  - **POST** http://localhost:5000/startype/submit        (For user to submit Survey)  (***Request Data***: Authorization-Header )

` Friend management Routes for User `

  - **GET** http://localhost:5000/friend             (Get Friends)  (***Request Data***: Authorization-Header)
  - **POST** http://localhost:5000/friend/add        (Send Friend Request)  (***Request Data***: Authorization-Header, recieverEmail )
  - **POST** http://localhost:5000/friend/accept        (Accept Friend Request)  (***Request Data***: Authorization-Header, id )

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
