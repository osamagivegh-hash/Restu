# Environment Setup Guide

## 🚨 IMPORTANT: Create these environment files

### 1. Frontend Environment (`frontend/.env.local`)
```bash
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# For production, use your deployed backend URL
# NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

### 2. Admin Environment (`admin/.env.local`)
```bash
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# For production, use your deployed backend URL
# NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
```

### 3. Backend Environment (`backend/.env`)
```bash
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://osamagivegh:990099@cluster0.npzs81o.mongodb.net/oriental-restaurant?retryWrites=true&w=majority&appName=Cluster0

# Email Configuration (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@goldendragon.com

# Security
JWT_SECRET=your-super-secret-jwt-key-here
SESSION_SECRET=your-super-secret-session-key-here

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

## 🔧 Setup Commands

Run these commands to create the environment files:

```bash
# Create frontend environment
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:5000" > frontend/.env.local

# Create admin environment  
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:5000" > admin/.env.local

# Create backend environment
cat > backend/.env << 'EOF'
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://osamagivegh:990099@cluster0.npzs81o.mongodb.net/oriental-restaurant?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-super-secret-jwt-key-here
SESSION_SECRET=your-super-secret-session-key-here
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
EOF
```

## 🚀 Start the servers

1. Start the backend server:
```bash
cd backend
npm install
npm start
```

2. Start the frontend server:
```bash
cd frontend
npm install
npm run dev
```

3. Start the admin server:
```bash
cd admin
npm install
npm run dev
```

## 🧪 Test the API

Run the test script to verify everything is working:
```bash
cd backend
node test-api.js
```
