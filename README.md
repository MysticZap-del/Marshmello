# Marshmello

A secure full-stack web application built using Node.js, Express.js, MongoDB Atlas, and Handlebars. The application provides user authentication, protected routes, and an authenticated contact submission system while incorporating backend performance and security optimizations.

## Features

* User Registration and Login
* JWT Authentication
* Password Hashing using bcrypt
* HTTP-only Cookies for secure session handling
* Protected Routes using custom authentication middleware
* Authenticated Contact Submission System
* MongoDB Indexing for optimized database queries
* API Pagination for efficient data retrieval
* API Rate Limiting for protection against abuse and brute-force attacks
* MongoDB Atlas Cloud Database Integration
* Deployed on Render

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication & Security

* JWT (JSON Web Tokens)
* bcrypt
* HTTP-only Cookies
* express-rate-limit

### Frontend

* HTML
* CSS
* Bootstrap
* Handlebars (HBS)

### Deployment & Tools

* Render
* Git
* GitHub
* Postman

## Security Features

* Passwords are hashed before being stored in the database.
* JWT-based authentication for user verification.
* HTTP-only cookies prevent client-side JavaScript access to authentication tokens.
* Rate limiting protects login endpoints from brute-force attacks.
* Protected routes ensure only authenticated users can access sensitive functionality.

## Performance Optimizations

### MongoDB Indexing

Indexes are created on frequently queried fields to improve lookup performance and reduce query execution time.

### Pagination

Pagination is implemented to limit the number of records returned per request, reducing response size and improving scalability.

### Rate Limiting

API rate limiting helps prevent excessive requests and protects the application from abuse.

## Installation

1. Clone the repository

```bash
git clone https://github.com/MysticZap-del/Marshmello
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the application

```bash
npm start
```

## Author

**Manthan Jain**

LinkedIn: https://www.linkedin.com/in/manthan-jain-17a8881bb/

GitHub: https://github.com/MysticZap-del/
