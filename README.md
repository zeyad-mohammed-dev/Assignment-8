# 📝 Notes API - Assignment 8

A complete RESTful API built with **Node.js**, **Express**, and **MongoDB** using **Mongoose** ODM.  
This project implements full CRUD operations for notes, user authentication, and advanced MongoDB features like **aggregation**, **population**, and **encryption**.

---

## 🚀 Features

✅ User Authentication (Sign up / Login)  
✅ Password hashing using bcrypt  
✅ Phone encryption & decryption using CryptoJS  
✅ CRUD operations for Notes  
✅ Pagination and Sorting  
✅ Aggregation with `$lookup` and `$project`  
✅ Custom Error Handling and Helpers  
✅ Modular Project Structure (Controller / Services / Utils / DB / Middleware)

---

## 🧠 Project Structure

```

src/  
│  
├── app.js  
├── index.js  
│  
├── bootstrap/  
│ └── startApp.js  
│  
├── db/  
│ ├── connection.js  
│ ├── DBservices.js  
│ └── models/  
│ ├── note.model.js  
│ └── user.model.js  
│  
├── middlewares/  
│ └── auth.middleware.js  
│  
├── modules/  
│ ├── userModule/  
│ │ ├── user.controller.js  
│ │ └── user.services.js  
│ └── noteModule/  
│ ├── note.controller.js  
│ └── note.services.js  
│  
└── utils/  
├── bcrypt.js  
├── crypto.js  
├── exceptions.js  
├── helpers.js  
└── successHandler.js

```

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/assignment8-notes-api.git
   cd assignment8-notes-api
```

2. **Install dependencies**
    
    ```bash
    npm install
    ```
    
3. **Create `.env` file**
    
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/notesDB
    ACCESS_TOKEN=your_secret_token
    BCRYPT_SALT_ROUNDS=10
    CRYPTO_SECRET_KEY=your_crypto_secret
    ```
    
4. **Run the server**
    
    ```bash
    npm run start:dev
    ```
    

✅ Output:

```
✅ connected to mongoDB
✅ server running on port 3000 🚀
```

---

## 📡 API Endpoints

### 🔐 **User Routes**

|Method|Endpoint|Description|
|---|---|---|
|`POST`|`/user/signup`|Register a new user|
|`POST`|`/user/login`|Login and get JWT token|
|`PATCH`|`/user/updateUser`|Update user info (auth required)|
|`DELETE`|`/user/deleteUser`|Delete user (auth required)|
|`GET`|`/user/`|Get current user info (auth required)|

---

### 🗒️ **Note Routes**

|Method|Endpoint|Description|
|---|---|---|
|`POST`|`/notes`|Create a note for the logged user|
|`PATCH`|`/notes/:noteId`|Update a single note|
|`PUT`|`/notes/replace/:noteId`|Replace entire note document|
|`PATCH`|`/notes/all`|Update all user notes titles|
|`DELETE`|`/notes/:noteId`|Delete a note|
|`DELETE`|`/notes`|Delete all notes for user|
|`GET`|`/notes/:id`|Get note by ID|
|`GET`|`/notes/note-by-content?content=Workout`|Get note by its content|
|`GET`|`/notes/note-with-user`|Get notes with user info (populate)|
|`GET`|`/notes/paginate-sort?page=1&limit=3`|Get paginated notes (sorted by createdAt desc)|
|`GET`|`/notes/aggregate?title=Code Review Notes`|Aggregation: notes + user info|

---

## 🧩 Tech Stack

|Technology|Description|
|---|---|
|**Node.js**|Server runtime|
|**Express.js**|Web framework|
|**MongoDB**|NoSQL database|
|**Mongoose**|ODM for MongoDB|
|**bcryptjs**|Password hashing|
|**CryptoJS**|Data encryption|
|**jsonwebtoken (JWT)**|Authentication|
|**dotenv**|Environment variables|

---

## 🧠 Aggregation Example

```js
const notes = await noteModel.aggregate([
  { $match: { userId } },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user",
    },
  },
  { $unwind: "$user" },
  {
    $project: {
      title: 1,
      createdAt: 1,
      "user.name": 1,
      "user.email": 1,
      _id: 0,
    },
  },
]);
```

---

## 🧑‍💻 Author

**Zeyad Mohamed**  
Node.js Developer | Assignment 8  
📧 [your-email@example.com](mailto:your-email@example.com)

---

## 💬 Notes

- Make sure MongoDB is running locally before starting the server.
    
- Test all routes using **Postman** or **Thunder Client**.
    
- Tokens must be sent in headers as:
    
    ```
    auth: your_jwt_token
    ```
    


