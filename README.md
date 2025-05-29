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

chit-chat-react-node/
├── client/                   # Frontend React application (UI and client-side logic)
│   ├── src/
│   │   ├── pages/            # React pages for major views
│   │   │   ├── auth/         # Login & Signup page components:contentReference[oaicite:40]{index=40}:contentReference[oaicite:41]{index=41}
│   │   │   ├── chat/         # Main chat interface components (sidebar, chat area):contentReference[oaicite:42]{index=42}:contentReference[oaicite:43]{index=43}
│   │   │   └── profile/      # Profile setup and edit page components:contentReference[oaicite:44]{index=44}:contentReference[oaicite:45]{index=45}
│   │   ├── components/      # Reusable components (e.g., ContactList, common UI elements)
│   │   │   └── contacts/    # Contacts list UI component used in sidebar:contentReference[oaicite:46]{index=46}:contentReference[oaicite:47]{index=47}
│   │   ├── store/           # Zustand state slices for global state (auth, chat):contentReference[oaicite:48]{index=48}:contentReference[oaicite:49]{index=49}
│   │   ├── context/         # Context providers (e.g., SocketContext for real-time socket):contentReference[oaicite:50]{index=50}
│   │   ├── lib/             # Utility modules (api-client for HTTP:contentReference[oaicite:51]{index=51}, helpers like `utils.js` for classes:contentReference[oaicite:52]{index=52})
│   │   ├── assets/          # Static assets (images, e.g., background and icons for UI)
│   │   └── ...              # Other config files (vite.config.js, tailwind.config.js, etc.)
│   ├── public/              # Public assets (if any, for Vite; not heavily used in this project)
│   └── package.json         # Frontend package definitions (dependencies like React, Axios, etc.)
└── server/                   # Backend Node.js application (Express server)
    ├── models/              # Mongoose schema definitions for database collections
    │   ├── UserModel.js     # User schema (email, password hash, profile info):contentReference[oaicite:53]{index=53}:contentReference[oaicite:54]{index=54}
    │   ├── MessagesModel.js # Message schema (sender, recipient, content/file, timestamp):contentReference[oaicite:55]{index=55}:contentReference[oaicite:56]{index=56}
    │   └── ChannelModel.js  # Channel schema (name, members, admin, messages):contentReference[oaicite:57]{index=57}:contentReference[oaicite:58]{index=58}
    ├── controllers/         # Express route handlers implementing app logic
    │   ├── AuthController.js       # Auth logic (signup, login, profile update, etc.):contentReference[oaicite:59]{index=59}:contentReference[oaicite:60]{index=60}
    │   ├── ContactsController.js  # Contact search and list logic (user queries):contentReference[oaicite:61]{index=61}:contentReference[oaicite:62]{index=62}
    │   ├── MessageController.js   # Message fetching and file upload logic:contentReference[oaicite:63]{index=63}:contentReference[oaicite:64]{index=64}
    │   └── ChannelControler.js    # Channel creation logic (group chats):contentReference[oaicite:65]{index=65}:contentReference[oaicite:66]{index=66}
    ├── routes/             # Express route definitions, mapping URLs to controller functions
    │   ├── AuthRoutes.js      # Routes under /api/auth (signup, login, logout, etc.):contentReference[oaicite:67]{index=67}:contentReference[oaicite:68]{index=68}
    │   ├── ContactRoutes.js   # Routes under /api/contacts (search, get contacts):contentReference[oaicite:69]{index=69}
    │   ├── MessagesRoutes.js  # Routes under /api/messages (get messages, upload file):contentReference[oaicite:70]{index=70}
    │   └── ChannelRoutes.js   # Routes under /api/channel (create channel):contentReference[oaicite:71]{index=71}
    ├── middlewares/        # Custom Express middleware
    │   └── AuthMiddleware.js   # JWT verification middleware for protected routes:contentReference[oaicite:72]{index=72}:contentReference[oaicite:73]{index=73}
    ├── uploads/            # Storage for uploaded files (profile images and message attachments)
    │   ├── profiles/       # Profile pictures (served at /uploads/profiles/... URL)
    │   └── files/          # Chat file attachments (served at /uploads/files/... URL)
    ├── index.js            # Entry point of the server (Express app configuration and startup):contentReference[oaicite:74]{index=74}:contentReference[oaicite:75]{index=75}
    ├── socket.js           # Socket.io setup for handling real-time events (message send/receive):contentReference[oaicite:76]{index=76}:contentReference[oaicite:77]{index=77}
    ├── .env                # Environment variables for server (not in repo; to be created by user)
    └── package.json        # Backend package definitions (dependencies like Express, Socket.io, Mongoose)


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

### Configure Environment
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

