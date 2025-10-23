# Assignment 8 - Notes Management API

A RESTful API built with Node.js, Express, and MongoDB for user authentication and note management. This application allows users to sign up, log in, and perform full CRUD operations on their personal notes with JWT-based authentication.

## Features

- 🔐 User authentication with JWT tokens
- 📝 Complete CRUD operations for notes
- 🔒 Secure password hashing with bcrypt
- 📱 Phone number encryption with AES
- 👤 User-specific note management
- 📄 Pagination and sorting support
- 🔍 Advanced search and filtering capabilities
- 📊 Aggregation pipeline for complex queries

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **crypto-js** - Data encryption
- **dotenv** - Environment variable management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd assignment-8
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=your-port
MONGODB_URI=mongodb://localhost:27017/your-database-name
ACCESS_TOKEN=your-jwt-secret-key
BCRYPT_SALT_ROUNDS=round-number
CRYPTO_SECRET_KEY=your-encryption-secret-key
```

4. Start the development server:
```bash
npm run start:dev
```

The server will start on `http://localhost:3000` (or your specified PORT).

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/notes-db` |
| `ACCESS_TOKEN` | Secret key for JWT signing | `your-secret-key-here` |
| `BCRYPT_SALT_ROUNDS` | Number of salt rounds for bcrypt | `10` |
| `CRYPTO_SECRET_KEY` | Secret key for AES encryption | `your-crypto-key-here` |

## API Endpoints

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/user/signup` | Register a new user | No |
| POST | `/user/login` | Login and receive JWT token | No |
| GET | `/user/` | Get logged-in user details | Yes |
| PATCH | `/user/updateUser` | Update user information | Yes |
| DELETE | `/user/deleteUser` | Delete user account | Yes |

### Note Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/notes/` | Create a new note | Yes |
| GET | `/notes/:id` | Get a specific note by ID | Yes |
| GET | `/notes/paginate-sort` | Get paginated user notes | Yes |
| GET | `/notes/note-by-content` | Search note by content | Yes |
| GET | `/notes/note-with-user` | Get notes with user info | Yes |
| GET | `/notes/aggregate` | Get notes using aggregation | Yes |
| PATCH | `/notes/:noteId` | Update a specific note | Yes |
| PATCH | `/notes/all` | Update all user notes' titles | Yes |
| PUT | `/notes/replace/:noteId` | Replace entire note document | Yes |
| DELETE | `/notes/:noteId` | Delete a specific note | Yes |
| DELETE | `/notes/` | Delete all user notes | Yes |

## API Usage Examples

### 1. User Signup
```http
POST /user/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "1234567890",
  "age": 25
}
```

**Response:**
```json
{
  "msg": "✅ Done",
  "status": 201,
  "data": {
    "_id": "64d91c42d8979e1f30a12345",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25
  }
}
```

### 2. User Login
```http
POST /user/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "msg": "✅ Done",
  "status": 200,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Create a Note
```http
POST /notes/
Content-Type: application/json
auth: <your-jwt-token>

{
  "title": "My First Note",
  "content": "This is the content of my note"
}
```

**Response:**
```json
{
  "msg": "✅ Done",
  "status": 200,
  "data": {
    "_id": "64d91c42d8979e1f30a12346",
    "title": "My First Note",
    "content": "This is the content of my note",
    "userId": "64d91c42d8979e1f30a12345",
    "createdAt": "2024-08-13T10:30:00.000Z",
    "updatedAt": "2024-08-13T10:30:00.000Z"
  }
}
```

### 4. Get Paginated Notes
```http
GET /notes/paginate-sort?page=1&limit=10
auth: <your-jwt-token>
```

### 5. Search Notes by Title (Aggregation)
```http
GET /notes/aggregate?title=My First Note
auth: <your-jwt-token>
```

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. After logging in, include the token in the request headers:

```
auth: <your-jwt-token>
```

The token expires after 1 hour. You'll need to log in again to get a new token.

## Project Structure

```
Assignment 8/
├── src/
│   ├── bootstrap/
│   │   └── startApp.js          # Application bootstrap
│   ├── db/
│   │   ├── models/
│   │   │   ├── user.model.js    # User schema
│   │   │   └── note.model.js    # Note schema
│   │   ├── connection.js         # MongoDB connection
│   │   └── DBservices.js         # Database service functions
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT authentication middleware
│   ├── modules/
│   │   ├── userModule/
│   │   │   ├── user.controller.js
│   │   │   └── user.services.js
│   │   └── noteModule/
│   │       ├── note.controller.js
│   │       └── note.services.js
│   ├── utils/
│   │   ├── bcrypt.js             # Password hashing utilities
│   │   ├── crypto.js             # Encryption utilities
│   │   ├── exceptions.js         # Custom error classes
│   │   ├── helpers.js            # Helper functions
│   │   └── successHandler.js     # Success response handler
│   ├── app.js                    # Express app configuration
│   └── index.js                  # Application entry point
├── .env                          # Environment variables (not in repo)
├── .gitignore
├── package.json
└── README.md
```

## Data Models

### User Model
- `name` - String (required)
- `email` - String (required, unique)
- `password` - String (required, hashed)
- `phone` - String (required, encrypted)
- `age` - Number (min: 18, max: 60)

### Note Model
- `title` - String (required, cannot be all uppercase)
- `content` - String (required)
- `userId` - ObjectId (required, references User)
- `createdAt` - Timestamp (auto-generated)
- `updatedAt` - Timestamp (auto-generated)

## Error Handling

The API includes comprehensive error handling with custom exceptions:

- `NotFoundException` - Resource not found (404)
- `NotValidEmailException` - Invalid email format (400)
- `NotValidCredentialsException` - Invalid login credentials (400)
- `NotValidTokenException` - Invalid or missing JWT token (403)
- `UnAuthorizedException` - Unauthorized access to resource (403)

## Security Features

- Password hashing using bcrypt with configurable salt rounds
- Phone number encryption using AES encryption
- JWT-based authentication with token expiration
- Owner-based authorization for note operations
- Input validation on models

## License

ISC

## Author

Zeyad Mohammed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note:** Make sure to keep your `.env` file secure and never commit it to version control.
