# Avet's TechShop

> This is an online store app to practice MERN stack & Redux.
> As a user here you can see products, add them to cart, order them, pay with paypal and much more.

- [Features](#features)
- [Usage](#usage)
  - [Env Variables](#env-variables)
  - [Install Dependencies (frontend & backend)](#install-dependencies-frontend--backend)
  - [Run](#run)
- [Build & Deploy](#build--deploy)
  - [Seed Database](#seed-database)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

![Screenshot](./screenshots/techsop%20screenshot1.jpg)
![Screenshot](./screenshots/techsop%20screenshot2.jpg)
![Screenshot](./screenshots/techsop%20screenshot3.jpg)
![Screenshot](./screenshots/techsop%20screenshot4.jpg)
![Screenshot](./screenshots/techsop%20screenshot5.jpg)
![Screenshot](./screenshots/techsop%20screenshot6.jpg)
![Screenshot](./screenshots/techsop%20screenshot7.jpg)
![Screenshot](./screenshots/techsop%20screenshot8.jpg)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URL = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
```

Change the JWT_SECRET and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

avet@gmail.com (Admin)
123456

user1@email.com (Customer)
123456

user2@email.com (Customer)
123456
```

#### Setting up the proxy

Using CRA we have a `"proxy"` setting in our frontend/package.json to avoid
breaking the browser [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) in development.

#### Vite outputs the build to /dist

Create React App by default outputs the build to a **/build** directory and this is
what we serve from our backend in production.  
Vite by default outputs the build to a **/dist** directory
Change...

```js
app.use(express.static(path.join(__dirname, "/frontend/build")));
```

to...

```js
app.use(express.static(path.join(__dirname, "/frontend/dist")));
```

and...

```js
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
);
```

to...

```js
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
);
```

#### Vite has a different script to run the dev server

In a CRA project you run `npm start` to run the development server, in Vite you
start the development server with `npm run dev`  
If you are using the **dev** script in your root pacakge.json to run the project
using concurrently, then you will also need to change your root package.json
scripts from...

```json
    "client": "npm start --prefix frontend",
```

to...

```json
    "client": "npm run dev --prefix frontend",
```

Or you can if you wish change the frontend/package.json scripts to use `npm
start`...

```json
    "start": "vite",
```
