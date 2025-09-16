# 🚀 Render Blueprint Deployment Guide

Deploy your entire Oriental Restaurant system (Backend + Frontend + Admin Panel) using Render's Blueprint feature.

## 📋 What You'll Deploy

- **Backend API**: Express.js server with MongoDB Atlas
- **Main Frontend**: Next.js restaurant website
- **Admin Panel**: Next.js admin control panel
- **Database**: MongoDB Atlas (external)

## 🎯 Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Atlas**: Your database connection string

## 🚀 Step-by-Step Deployment

### **Step 1: Prepare Your Repository**

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for Render deployment"
   git push origin main
   ```

2. **Verify your `render.yaml` file** is in the root directory

### **Step 2: Deploy with Render Blueprint**

1. **Go to Render Dashboard**:
   - Visit [render.com](https://render.com)
   - Sign in to your account

2. **Create New Blueprint**:
   - Click "New +" button
   - Select "Blueprint"
   - Connect your GitHub repository
   - Select the repository containing your code

3. **Configure Blueprint**:
   - Render will automatically detect your `render.yaml` file
   - Review the services that will be created:
     - `oriental-restaurant-backend` (Web Service)
     - `oriental-restaurant-frontend` (Static Site)
     - `oriental-restaurant-admin` (Static Site)
     - `oriental-restaurant-db` (Database - optional if using MongoDB Atlas)

4. **Set Environment Variables**:
   - **For Backend Service**:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: Will be auto-set to your frontend URL
     - `PORT`: `10000` (Render's default)

   - **For Frontend Services**:
     - `NEXT_PUBLIC_BACKEND_URL`: Will be auto-set to your backend URL

5. **Deploy**:
   - Click "Apply" to start the deployment
   - Render will build and deploy all services

### **Step 3: Monitor Deployment**

1. **Watch Build Logs**:
   - Each service will show build progress
   - Backend will install dependencies and start
   - Frontend services will build static files

2. **Check Service Status**:
   - All services should show "Live" status
   - Backend health check at `/api/health`

## 🔗 Your Deployed URLs

After successful deployment, you'll have:

- **Main Website**: `https://oriental-restaurant-frontend.onrender.com`
- **Admin Panel**: `https://oriental-restaurant-admin.onrender.com`
- **Backend API**: `https://oriental-restaurant-backend.onrender.com`

## 🔧 Configuration Details

### **Backend Service**
```yaml
- type: web
  name: oriental-restaurant-backend
  env: node
  plan: free
  buildCommand: cd backend && npm install
  startCommand: cd backend && npm start
  healthCheckPath: /api/health
```

### **Frontend Services**
```yaml
- type: web
  name: oriental-restaurant-frontend
  env: static
  buildCommand: cd frontend && npm install && npm run build
  staticPublishPath: frontend/out
```

### **Admin Panel**
```yaml
- type: web
  name: oriental-restaurant-admin
  env: static
  buildCommand: cd admin && npm install && npm run build
  staticPublishPath: admin/out
```

## 🔒 Environment Variables

### **Backend Environment Variables**:
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://osamagivegh:990099@cluster0.npzs81o.mongodb.net/oriental-restaurant?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=https://oriental-restaurant-frontend.onrender.com
PORT=10000
```

### **Frontend Environment Variables**:
```env
NEXT_PUBLIC_BACKEND_URL=https://oriental-restaurant-backend.onrender.com
```

### **Admin Panel Environment Variables**:
```env
NEXT_PUBLIC_BACKEND_URL=https://oriental-restaurant-backend.onrender.com
```

## 🎯 Benefits of Render Blueprint

1. **Single Deployment**: Deploy all services at once
2. **Automatic Configuration**: Environment variables are set automatically
3. **Service Discovery**: Services can communicate using internal URLs
4. **Unified Management**: Manage all services from one dashboard
5. **Cost Effective**: Free tier available for all services

## 🔧 Troubleshooting

### **Common Issues**:

1. **Build Failures**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **CORS Errors**:
   - Backend CORS is configured for Render URLs
   - Check environment variables are set correctly

3. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database name is correct

4. **Static Site Issues**:
   - Verify `output: 'export'` in next.config.js
   - Check staticPublishPath is correct
   - Ensure build completes successfully

### **Debugging Steps**:

1. **Check Service Logs**:
   - Go to each service in Render dashboard
   - View logs for errors

2. **Test API Endpoints**:
   - Visit `https://your-backend.onrender.com/api/health`
   - Should return JSON with status

3. **Verify Environment Variables**:
   - Check all required variables are set
   - Ensure URLs are correct

## 🚀 Post-Deployment

### **Test Your Deployment**:

1. **Main Website**:
   - Visit your frontend URL
   - Test contact form
   - Test careers form

2. **Admin Panel**:
   - Visit your admin URL
   - Login with: `admin` / `admin123`
   - Test all admin functions

3. **API Endpoints**:
   - Test health check
   - Verify form submissions work

### **Custom Domain (Optional)**:

1. **Add Custom Domain**:
   - Go to service settings
   - Add your domain
   - Update DNS records

2. **SSL Certificate**:
   - Render provides free SSL
   - Automatically enabled

## 📊 Monitoring

1. **Service Health**:
   - Monitor service status
   - Check response times

2. **Logs**:
   - View application logs
   - Monitor errors

3. **Metrics**:
   - Track usage
   - Monitor performance

## 🎉 Success!

Your Oriental Restaurant system is now live on Render with:

- ✅ Backend API running
- ✅ Main website deployed
- ✅ Admin panel accessible
- ✅ Database connected
- ✅ All services communicating

**Admin Login**: `admin` / `admin123`

Enjoy your deployed Oriental Restaurant system! 🍜
