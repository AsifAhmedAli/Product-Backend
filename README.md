# Product Node API

Backend API is consistent of following stack:
 - Nodejs
 - Express
 - Mongodb


## Quick Start

To install the dependencies, simply run:

```bash
npm install
```

Then start the server

```bash
npm start
```

# Pre-requisites

## Set the environment variables
replace `.example.env` file with `.env`<br/>

Following are the Secrets & API Keys used in .env: <br/>
`you can remove these later from here After copying` <br/>

PORT=5000<br/>
MONGO_URI=mongodb://localhost:27017/startDB<br/>
JWT_SECRET=secret<br/>
FRONT_URL=https://www.example.com<br/>
YOUTUBE_API_KEY=AIzaSyCIuFMZKeXvvRmYfxEn2uBGaJFXivzcE1Y<br/>
GOOGLE_CLIENT_ID=1040995054347-p9hqso6qeh4i8lenfofoijcpqhmkamci.apps.googleusercontent.com<br/>
GOOGLE_CLIENT_SECRET=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<br/>
FACEBOOK_APP_ID=3015667075428557<br/>
FACEBOOK_APP_SECRET=33d79f1e057d6dc86ea7add5aabc0d64<br/>
JWT_EXPIRATION=3600s<br/>
JWT_COOKIE_EXPIRATION=3600<br/>
JWT_REFRESH_EXPIRATION=8400<br/>

# Important Concepts

## Authentication
 - Cookies are used in backend to store Token credentials after User logs In.
 - Middleware handles the Logic behind the **Access Tokens** and **Role Based Auth** machanism.
 - **_Refresh Tokens needs implementation yet_**.
 - For Access to routes, All the protected routes must be sent with the following Header format:
    - `Authorization: Bearer <TokenHash>`

## Images Upload
 - **_Cloudinary_** services can be used for Images uploading and assets handling.
 - Or Local uploads functionality can be used. **It depends on the server logic and deployment options**

## Email Notifications & Verification
 - Currently **Nodemailer** is working as email Handler.
 - Better options like **Sendgrid** are considerable as per scalability and more better functionality.
 - Nodemailer can be replaced with Sendgrid because of better performance reasons.
 
## Deployment options to consider
 - DigitalOcean (Ubuntu Droplet with Mongodb Atlas as DB)
 - Amazon EC2 with Mongodb Atlas

## Payment Gateways
 - _**Payment gateways are not yet implemented, Needs to be implemented**_

## Different APIs
 - Youtube API (For handling youtube related functionality)
 - Facebook API **(Auth)**
 - Google API **(Auth)**

# Routes
### Authentication 
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
