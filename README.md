# Campus Node Project
📌 Overview
The Senior-Junior Interaction Project is a platform designed to bridge the gap between senior and junior students. It enables mentorship, networking, and knowledge sharing through various features like messaging, forums, and event management.

# Wireframes
https://app.eraser.io/workspace/up9UcmRdIJvJq5HEkalT

🚀 Features
- User Authentication & Authorization (JWT-based)
- Profile Management (Create, update, and view profiles)
- Search & Filtering (Find users based on interests and skills)
- Messaging System (Direct messaging between users)
- Community Forum (Discussion boards for knowledge sharing)
- Event Management (Create and RSVP to events)
- Mentorship Matching (Connect with mentors based on skills and interests)

🛠️ Tech Stack
Frontend: React.js, React Router, Material UI
Backend: Node.js, Express.js, JWT, bcrypt
Database: MongoDB (Mongoose)
Real-time Communication: WebSockets (Socket.io)
Deployment: Netlify/Vercel (Frontend), Heroku/AWS (Backend), MongoDB Atlas (Database)

🏗️ Installation & Setup
Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

Install dependencies
# server
cd backend
npm install

# client
cd ../client
npm install
Set up environment variables
Create a .env file in the backend and frontend folders with required credentials (MongoDB URI, JWT Secret, etc.).

Run the application
# server
cd server
npm start

# client
cd ../client
npm run dev 
