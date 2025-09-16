# 🚀 Deployment Guide - Oriental Restaurant System

This guide covers multiple deployment options for your Oriental Restaurant system.

## 📋 System Overview

Your system consists of:
- **Backend API**: Express.js + MongoDB Atlas
- **Main Frontend**: Next.js restaurant website
- **Admin Panel**: Next.js admin control panel

## 🎯 Deployment Options

### **Option 1: Separate Deployments (Recommended)**

#### **Backend Deployment (Render/Railway/Heroku)**

1. **Deploy to Render**:
   ```bash
   # Connect your GitHub repository to Render
   # Use the render.yaml configuration
   ```

2. **Deploy to Railway**:
   ```bash
   # Connect your GitHub repository to Railway
   # Railway will auto-detect Node.js and use package.json
   ```

3. **Deploy to Heroku**:
   ```bash
   # Install Heroku CLI
   heroku create your-backend-name
   git subtree push --prefix backend heroku main
   ```

#### **Frontend Deployments (Vercel/Netlify)**

1. **Deploy Main Frontend to Vercel**:
   ```bash
   # Connect GitHub repository to Vercel
   # Set root directory to 'frontend'
   # Add environment variable: NEXT_PUBLIC_BACKEND_URL
   ```

2. **Deploy Admin Panel to Vercel**:
   ```bash
   # Connect GitHub repository to Vercel
   # Set root directory to 'admin'
   # Add environment variable: NEXT_PUBLIC_BACKEND_URL
   ```

### **Option 2: Integrated Deployment**

Deploy admin panel as part of the backend server.

#### **Steps for Integrated Deployment**:

1. **Build Admin Panel**:
   ```bash
   cd admin
   npm run build
   ```

2. **Use Integrated Server**:
   ```bash
   cd backend
   # Use server-integrated.js instead of server.js
   node server-integrated.js
   ```

3. **Deploy Backend with Admin**:
   - Backend serves both API and admin panel
   - Main frontend deployed separately

## 🔧 Environment Variables

### **Backend Environment Variables**:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
FRONTEND_URL=https://your-frontend-domain.com
```

### **Frontend Environment Variables**:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

### **Admin Panel Environment Variables**:
```env
NEXT_PUBLIC_BACKEND_URL=https://your-backend-domain.com
```

## 🚀 Quick Deployment Steps

### **Method 1: Vercel + Render (Recommended)**

1. **Deploy Backend to Render**:
   - Connect GitHub repository
   - Set root directory to `backend`
   - Add environment variables
   - Deploy

2. **Deploy Frontend to Vercel**:
   - Connect GitHub repository
   - Set root directory to `frontend`
   - Add `NEXT_PUBLIC_BACKEND_URL` environment variable
   - Deploy

3. **Deploy Admin to Vercel**:
   - Connect GitHub repository
   - Set root directory to `admin`
   - Add `NEXT_PUBLIC_BACKEND_URL` environment variable
   - Deploy

### **Method 2: All on Render**

1. **Deploy Backend**:
   - Use `render.yaml` configuration
   - Deploy backend service

2. **Deploy Frontends**:
   - Use `render.yaml` configuration
   - Deploy both frontend services

### **Method 3: Integrated Deployment**

1. **Build Admin Panel**:
   ```bash
   cd admin
   npm run build
   ```

2. **Deploy Backend with Admin**:
   - Use `server-integrated.js`
   - Deploy to any Node.js hosting service

3. **Deploy Main Frontend Separately**

## 🔒 Security Considerations

1. **Environment Variables**:
   - Never commit `.env` files
   - Use platform-specific environment variable settings

2. **CORS Configuration**:
   - Update allowed origins for production domains
   - Remove localhost origins in production

3. **Database Security**:
   - Use MongoDB Atlas IP whitelist
   - Enable database authentication

## 📊 Monitoring & Maintenance

1. **Health Checks**:
   - Backend: `/api/health`
   - Monitor uptime and performance

2. **Logs**:
   - Check application logs regularly
   - Monitor error rates

3. **Database**:
   - Monitor MongoDB Atlas metrics
   - Set up alerts for connection issues

## 🎯 Recommended Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Main Website  │    │   Admin Panel   │    │   Backend API   │
│   (Vercel)      │    │   (Vercel)      │    │   (Render)      │
│                 │    │                 │    │                 │
│ localhost:3000  │    │ localhost:3002  │    │ localhost:5000  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  MongoDB Atlas  │
                    │   (Database)    │
                    └─────────────────┘
```

## 🚀 Production URLs

After deployment, your URLs will be:
- **Main Website**: `https://your-frontend.vercel.app`
- **Admin Panel**: `https://your-admin.vercel.app`
- **Backend API**: `https://your-backend.onrender.com`

## 🔧 Troubleshooting

1. **CORS Errors**:
   - Update CORS origins in backend
   - Check environment variables

2. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings

## 📝 Next Steps

1. Choose your deployment method
2. Set up environment variables
3. Deploy backend first
4. Deploy frontends with correct backend URL
5. Test all functionality
6. Set up monitoring and alerts

Your Oriental Restaurant system is now ready for production deployment! 🎉
