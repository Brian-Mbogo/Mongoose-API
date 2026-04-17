# Mongoose REST API

A simple Node.js REST API built with Express and Mongoose for managing users in a MongoDB database.

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ MongoDB integration with Mongoose
- ✅ Environment variable configuration with dotenv
- ✅ Error handling and validation
- ✅ JSON request/response format
- ✅ RESTful API design

## Project Structure

```
mongoose-api/
├── config/
│   └── .env                 # Environment variables
├── models/
│   └── User.js             # User schema and model
├── server.js               # Main Express server file
├── package.json            # Project dependencies
├── package-lock.json       # Dependency lock file
└── README.md              # This file
```

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn
- Postman (for API testing)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Brian-Mbogo/Mongoose-API.git
cd mongoose-api
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables file:
```bash
# Create config/.env file with the following:
PORT=3000
MONGO_URI=mongodb://localhost:27017/mongoose-api
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

4. Start the server:
```bash
node server.js
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Health Check
- **GET** `/`
- **Description**: Verify API is running
- **Response**: `"API is working"`

### 2. Get All Users
- **GET** `/users`
- **Description**: Retrieve all users from the database
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "123abc",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 25
    }
  ],
  "message": "Users retrieved successfully"
}
```

### 3. Create a New User
- **POST** `/users`
- **Description**: Add a new user to the database
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "age": 28
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "456def",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "age": 28
  },
  "message": "User created successfully"
}
```
- **Status**: `201 Created`

### 4. Update a User
- **PUT** `/users/:id`
- **Description**: Edit a user by their ID
- **Request Body**:
```json
{
  "name": "Jane Smith",
  "email": "jane.smith@example.com",
  "age": 29
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "456def",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 29
  },
  "message": "User updated successfully"
}
```
- **Status**: `200 OK`

### 5. Delete a User
- **DELETE** `/users/:id`
- **Description**: Remove a user by their ID
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "456def",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 29
  },
  "message": "User deleted successfully"
}
```
- **Status**: `200 OK`

## User Schema

```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

Common HTTP Status Codes:
- `200 OK` - Successful GET, PUT, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Missing required fields
- `404 Not Found` - User not found
- `500 Internal Server Error` - Server error

## Testing with Postman

1. **Import the API**:
   - Open Postman
   - Create requests for each endpoint

2. **Test Sequence**:
   - GET `/users` - Should return empty array
   - POST `/users` - Create a new user
   - GET `/users` - Should return the created user
   - PUT `/users/{userId}` - Update the user
   - DELETE `/users/{userId}` - Delete the user
   - GET `/users` - Should return empty array

## Environment Variables

Create a `.env` file in the `config/` folder:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/mongoose-api
```

**For MongoDB Atlas**:
```
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

## Technologies Used

- **Express.js** - Web framework for Node.js
- **Mongoose** - MongoDB object modeling
- **dotenv** - Environment variable management
- **Node.js** - JavaScript runtime

## Dependencies

```json
{
  "express": "^5.2.1",
  "mongoose": "^9.4.1",
  "dotenv": "^17.4.2"
}
```

## Running the Project

```bash
# Development
node server.js

# With nodemon (auto-restart on changes)
npm install --save-dev nodemon
npx nodemon server.js
```

## Future Enhancements

- [ ] Add JWT authentication
- [ ] Implement user roles and permissions
- [ ] Add input validation middleware
- [ ] Create comprehensive API documentation (Swagger/OpenAPI)
- [ ] Add unit tests with Jest
- [ ] Implement pagination for GET /users
- [ ] Add search/filter functionality

## License

ISC

## Author

Brian Mbogo

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Support

For issues or questions, please open an issue on the GitHub repository.
