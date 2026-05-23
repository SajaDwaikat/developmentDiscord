# Discord Clone

A simplified Discord-inspired real-time messaging application built with React, Node.js, Express, MongoDB, and Socket.io.

## Features

- User Registration
- User Login with JWT Authentication
- Multiple Chat Channels
  - General
  - React
  - NodeJS
- Real-Time Messaging using Socket.io
- Message Persistence with MongoDB
- Responsive and User-Friendly Interface
- Channel-Based Conversations
- Automatic Message Updates

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.io
- JWT Authentication
- Bcrypt.js

## Project Structure

```
DiscordClone
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   └── server.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the server folder:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Messages

```http
POST /api/messages
GET /api/messages/:channel
```

## Real-Time Communication

Socket.io is used to:

- Broadcast messages instantly
- Synchronize conversations between connected users
- Provide live chat functionality

## Future Improvements

- Private Messaging
- Online Users List
- User Profiles
- Typing Indicator
- Message Reactions
- Dark/Light Theme Toggle

## Author

Saja Dwaikat
Computer Engineering Student
