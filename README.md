# `Express Authentication`

Express authentication template using Passport + Flash messages + custom middleware

## What it includes

* MongoDB 
* Settings for MongoDB and MongoDB Compass
* Passport and passport-local for authentication
* Sessions to keep user logged in between pages
* Flash messages for errors and successes
* Passwords that are hashed with BCrypt


### User Model

| Column Name | Data Type | Notes |
| --------------- | ------------- | ------------------------------ |
| id | Integer | Serial Primary Key, Auto-generated |
| firstName | String | Must be provided |
| lastName | String | Must be provided |
| email | String | Must be unique / used for login |
| password | String | Stored as a hash |
| userName | String | unique |
| city | String | Must be provided |
| state | String | Must be provided |
| country | String | Must be provided |
| bio | String | Optional |
| profilePicture | href | Optional |
| createdAt | Date | Auto-generated |
| updatedAt | Date | Auto-generated |

### Server Route

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | / | app.js | Test for server |

### User Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | /users/test | user.test.js | User is logged in |
| GET | /users/profile | user.test.js | Regular user profile |
| GET | users/email/:email | user.test.js | User email |
| GET | users/messages | user.test.js | User authentication |
| POST | /users/login | user.test.js | Login user |
| POST | /users/signup | user.test.js | Creates User |
| PUT | /users/:id | user.test.js | Update user info by id |
| DELETE | /users/id | user.test.js | Delete user info by id |

### TMDB API Routes

| Method | Path | Location | Purpose |
| ------ | ---------------- | -------------- | ------------------- |
| GET | /api/search/:query| tmdb-api.test.js | Search for movies |
| GET | /api/movie/:id| tmdb-api.test.js | Get movie details by id |
| GET | /api/movie/:id/credits| tmdb-api.test.js | Get movie credits by id |
| GET | /api/discover/:genre| tmdb-api.test.js | Discover movies by genre |
| GET | /api/movie/:id/recommendations| tmdb-api.test.js | Get movie recommendations by id |
| GET | /api/popular | tmdb-api.test.js | Get popular movies |
| GET | /api/now-playing| tmdb-api.test.js | Get movies that is now playing |
| GET | /api/upcoming| tmdb-api.test.js | Get upcoming movies |
| GET | /api/top-rated| tmdb-api.test.js | Get top-rated movies |



## `1` Fork & Clone Project & Install Dependencies
`1` The first thing that we are going to do is `fork` and `clone`

`2` Now we are going to install the current dependencies that are listed inside of `package.json`
```text
npm install
```

`3` We have the current packages for `authentication`. These are the following packages:

-  [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library to help you hash passwords. ( [wikipedia](https://en.wikipedia.org/wiki/Bcrypt) ) 
    - Blowfish has a 64-bit block size and a variable key length from 32 bits up to 448 bits.
- [connect-flash](https://github.com/jaredhanson/connect-flash): The flash is an area of the session used for storing messages that will be used to to display to the user. Flash is typically used with redirects.
- [passport](https://www.passportjs.org/docs/): Passport is authentication middleware for Node.js. It is designed to do one thing authenticate requests. There are over 500+ strategies used to authenticate a user; however, we will be using one - *passport-local* Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests
- [passport-local](http://www.passportjs.org/packages/passport-local/): The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user. [passport-local](http://www.passportjs.org/packages/passport-local/)
- [express-session](https://github.com/expressjs/session): Create a session middleware with given *options*.
- [method-override](https://github.com/expressjs/method-override): Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.


## `2` Create Database & Update Sequelize Config

`1` Update **`config.json`** file with the following:

```json
{
  "name": "Any Time Flix",
  "version": "1.0.0",
  "description": "Your one stop shop for all your movie needs!",
  "main": "app.js",
  "scripts": {
    "test": "mocha",
    "start": "node app.js",
    "dev": "nodemon"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@faker-js/faker": "^8.0.2",
    "axios": "^1.6.2",
    "bcrypt": "^5.1.1",
    "chai": "^4.3.7",
    "cors": "^2.8.5",
    "dotenv": "^16.1.4",
    "express": "^4.18.2",
    "jest": "^29.5.0",
    "jsonwebtoken": "^9.0.2",
    "method-override": "^3.0.0",
    "mocha": "^10.2.0",
    "mongoose": "^7.2.4",
    "nodemon": "^3.0.2",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "react": "^18.2.0",
    "supertest": "^6.3.3"
  }
}
```

`2` Create database `express_auth_dev`

```text
sequelize db:create
```



## `3` Analyze File Structure

```text
├── config
│   └── config.json
|    └── passport.js
|    └── ppConfig.js 
├── controllers
│   └── auth.js
│   └── users.js
│   └── index.js
|   └── tmdb-api.js
├── middleware
│   └── isLoggedIn.js
├── migrations
│   └── 20230525020133-create-user.js
├── models
│   └── index.js
│   └── user.js
├── node_modules
│   └── ...
├── public
│   └── assets
|       └── keep
│   └── css
│       └── style.css
├── pages
│   └── HomePage.js
├── test
│   └── auth.test.js
│   └── index.test.js
│   └── profile.test.js
│   └── tmdb-api.test.js
│   └── user.test.js
├── resources
│   └── erd1.png
│   └── erd2.png
│   └── mike's user stories.md
│   └── mike's user stories.md
│   └── project-2-plan.md
│   └── Screen Shot.png
├── views
│   └── auth
│       └── login.ejs
│       └── signup.ejs
│   └── partials
│   │   └── footer.ejs
│   └── index.ejs
│   └── layout.ejs
│   └── alerts.ejs
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── README.md
├── README1.md
├── readme2.md
```

- `config.json`: Where you need to configure your project to interact with your postgres database.
- `controllers`: The folder where all of your controllers ( routes ) will go to control the logic of your app.
- `models`: The folder where all the models will be stored that will interact with the database.
- `node_modules`: The folder that is generated by **npm** that stores the source code for all dependencies installed.
- `public`: is to have those views that would be publicly accessible in the application. ex. `style.css`
- `test`: The folder where all your test that you make will be stored. ex. `auth.test.js`
- `views`: The folder where all the app's templates will be stored for displaying pages to the user. ex. `login.ejs`
- `.gitignore`: A hidden file that will hide and prevent any files with to NOT get pushed to Github.
- `package-lock.json`: is automatically generated for any operations where npm modifies either the `node_modules` tree, or `package.json`.
- `package.json`: The settings file that stores scripts and list of dependencies that are used inside your app.
- `README.md`: The main markdown file that written to explain the details your app.
- `server.js`: The main file that controls the entire application.