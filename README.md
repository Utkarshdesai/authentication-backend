# authentication-backend 
Node.js Express MongoDB Authentication & Authorization
🔒 A simple and secure authentication and authorization system built with Node.js, Express.js, and MongoDB.

Features:
JWT Authentication: Utilizing JSON Web Tokens for secure user authentication.
Cookie-Based Tokens: Enhancing security by storing tokens in HTTP-only cookies.
Bcrypt.js for Password Hashing: Safely storing user passwords using bcrypt.js.
Express Middleware for Authorization: Protecting routes with custom middleware for authorization. 

Setup: 
1. Clone the Repository:
   git clone https://github.com/yourusername/auth-express-mongodb.git
   
2.Install Dependencies:
  cd auth-express-mongodb
  npm install 

3. Environment Variables:
   Create a .env file and add the following:
   PORT=3000
   MONGO_URI=mongodb://your-mongodb-uri
   JWT_SECRET=your-secret-key

4. Run the Application:
   npm start

Usage:
User Registration:

Endpoint: POST /home/v1/signup
Payload: { "username": "yourusername", "password": "yourpassword" }

User Login:
Endpoint: POST /home/v1/login
Payload: { "username": "yourusername", "password": "yourpassword" }
Protected Route:

//protected route
router.get('/student' , auth , isstudent )

router.get('/admin' , auth ,isadmin )
