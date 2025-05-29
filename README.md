# Chit-Chat 🗨️  
A real-time messaging web app with file sharing, user profiles, and modern UI.

## ✨ Features

- 🔒 **Authentication** – JWT-based secure login and sign-up  
- 🧑‍💼 **Profile Management** – Setup and edit name, avatar, and profile image  
- 💬 **Real-Time Chat** – One-on-one instant messaging via Socket.io  
- 📁 **File Sharing** – Upload and download files or images in conversations  
- 📃 **Persistent Message History** – All messages stored and retrieved from MongoDB  
- 📱 **Responsive Design** – Mobile-friendly interface using Tailwind CSS  

---

## 🚀 Tech Stack

**Frontend:**  
- React + Vite  
- Zustand (state management)  
- Tailwind CSS  
- Axios, Socket.io Client  
- Emoji Picker, Toast Notifications (`sonner`)  
- Radix UI + React Icons

**Backend:**  
- Node.js + Express  
- MongoDB + Mongoose  
- Socket.io (WebSocket)  
- JWT Auth + Bcrypt  
- Multer (file uploads), CORS, dotenv

---
## 📁 Folder Structure

```
chit-chat-react-node/
├── client/                   # Frontend React application (UI and client-side logic)
│   ├── src/
│   │   ├── pages/            # React pages for major views
│   │   │   ├── auth/         # Login & Signup page components
│   │   │   ├── chat/         # Main chat interface components (sidebar, chat area)
│   │   │   └── profile/      # Profile setup and edit page components
│   │   ├── components/       # Reusable components (e.g., ContactList, common UI elements)
│   │   │   └── contacts/     # Contacts list UI component used in sidebar
│   │   ├── store/            # Zustand state slices for global state (auth, chat)
│   │   ├── context/          # Context providers (e.g., SocketContext for real-time socket)
│   │   ├── lib/              # Utility modules (api-client for HTTP, helpers like `utils.js`)
│   │   ├── assets/           # Static assets (images, e.g., background and icons for UI)
│   │   └── ...               # Other config files (vite.config.js, tailwind.config.js, etc.)
│   ├── public/               # Public assets (if any, for Vite; not heavily used)
│   └── package.json          # Frontend package definitions (React, Axios, etc.)
└── server/                   # Backend Node.js application (Express server)
    ├── models/               # Mongoose schema definitions for database collections
    │   ├── UserModel.js      # User schema (email, password hash, profile info)
    │   ├── MessagesModel.js  # Message schema (sender, recipient, content/file, timestamp)
    │   └── ChannelModel.js   # Channel schema (name, members, admin, messages)
    ├── controllers/          # Express route handlers implementing app logic
    │   ├── AuthController.js       # Auth logic (signup, login, profile update, etc.)
    │   ├── ContactsController.js  # Contact search and list logic (user queries)
    │   ├── MessageController.js   # Message fetching and file upload logic
    │   └── ChannelControler.js    # Channel creation logic (group chats)
    ├── routes/               # Express route definitions, mapping URLs to controllers
    │   ├── AuthRoutes.js         # Routes under /api/auth (signup, login, logout, etc.)
    │   ├── ContactRoutes.js      # Routes under /api/contacts (search, get contacts)
    │   ├── MessagesRoutes.js     # Routes under /api/messages (get messages, upload file)
    │   └── ChannelRoutes.js      # Routes under /api/channel (create channel)
    ├── middlewares/          # Custom Express middleware
    │   └── AuthMiddleware.js     # JWT verification middleware for protected routes
    ├── uploads/              # Storage for uploaded files (profile images & attachments)
    │   ├── profiles/         # Profile pictures (served at /uploads/profiles/...)
    │   └── files/            # Chat file attachments (served at /uploads/files/...)
    ├── index.js              # Entry point for server setup (Express app & middleware)
    ├── socket.js             # Socket.io setup for handling real-time message events
    ├── .env                  # Environment variables (to be created by user)
    └── package.json          # Backend dependencies (Express, Socket.io, Mongoose)
```

---

## ⚙️ Setup Instructions

### 1. Clone Repo  
```bash
git clone https://github.com/aajax1211/chit-chat-react-node.git
cd chit-chat-react-node
### Install Dependencies
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### Configure Environment
```
  In server/.env:

Copy
Edit
DATABASE_URL=mongodb collection url
JWT_KEY=your_jwt_secret_key
ORIGIN= localhost / url
PORT=4001

  In client/.env:

Copy
Edit
VITE_SERVER_URL = sever url
```

---

## 🧪 Run the App

### Start Backend Server:
```bash
cd server
npm run dev
```

### Start Frontend:
```bash
cd client
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

---

## 🧰 Usage Guide

- **Sign up** → complete profile → start chatting  
- **New DM** → click `+` → search users → start chatting  
- **Send Messages** → type + enter  
- **Send Files** → click 📎 to upload images/files  
- **Download Files** → click download icon  
- **Profile Edit** → click ✏️ icon to update  
- **Logout** → click power icon 🔌  

---

## 🧩 Upcoming Updates

- [ ] Group channel messaging (UI + socket + backend)  
- [ ] Message pagination for long chats  
- [ ] Typing indicators for real-time UX  
- [ ] Read receipts functionality  
- [ ] Online presence indicators  
- [ ] Notification badges for new messages  
- [ ] File size/type restrictions on backend  
- [ ] Socket scalability improvements  
- [ ] Auth rate limiting and email validation  
- [ ] Tests (Jest / React Testing Library / Supertest)  

---

## 🙌 Contribution

1. Fork this repo  
2. Create your branch:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```  
3. Commit your changes:  
   ```bash
   git commit -m 'feat: Add some feature'
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature/AmazingFeature
   ```  
5. Open a Pull Request

