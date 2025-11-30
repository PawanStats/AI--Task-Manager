# 🚀 Deployment Guide for AI Task Manager

This guide will help you deploy your AI Task Manager application to production.

## 📋 Prerequisites

- GitHub account
- Vercel/Netlify account (for frontend)
- Render/Railway account (for backend)

---

## 🎯 Option 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

1. Make sure your `backend/package.json` has a start script:
```json
"scripts": {
  "start": "node index.js"
}
```

2. Create a `render.yaml` file in the backend folder (optional but recommended)

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ai-task-manager-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes)
7. **Copy your backend URL** (e.g., `https://ai-task-manager-backend.onrender.com`)

---

## 🎯 Option 2: Deploy Backend to Railway

### Step 1: Deploy to Railway

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect Node.js
5. Add root directory: `backend`
6. Click **"Deploy"**
7. Go to **Settings** → **Networking** → **Generate Domain**
8. **Copy your backend URL** (e.g., `https://ai-task-manager-backend.up.railway.app`)

---

## 🌐 Deploy Frontend to Vercel

### Step 1: Update API URL

1. Open `frontend/src/utils.js`
2. Update the API_URL:
```javascript
export const API_URL = 'https://your-backend-url.onrender.com';
```
Replace with your actual backend URL from Render/Railway

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Click **"Deploy"**
6. Wait for deployment (3-5 minutes)
7. **Your app is live!** (e.g., `https://ai-task-manager.vercel.app`)

---

## 🌐 Alternative: Deploy Frontend to Netlify

### Step 1: Update API URL (same as above)

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Click **"Deploy site"**
6. Wait for deployment (3-5 minutes)
7. **Your app is live!** (e.g., `https://ai-task-manager.netlify.app`)

---

## ✅ Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend can connect to backend
- [ ] Test all features:
  - [ ] Add task
  - [ ] Edit task
  - [ ] Delete task
  - [ ] Mark complete/incomplete
  - [ ] Search tasks
  - [ ] Get AI suggestions
  - [ ] Add suggestion as task
  - [ ] Toggle dark/light theme
  - [ ] Change task priority
  - [ ] Refresh page (localStorage should work)

---

## 🐛 Troubleshooting

### Backend Issues

**Issue**: Backend not starting
- Check logs in Render/Railway dashboard
- Verify `package.json` has correct start script
- Ensure all dependencies are listed

**Issue**: CORS errors
- Backend already has CORS enabled
- If issues persist, check backend logs

### Frontend Issues

**Issue**: Cannot connect to backend
- Verify `API_URL` in `utils.js` is correct
- Check if backend URL is accessible (open in browser)
- Look for CORS errors in browser console

**Issue**: Build fails
- Run `npm run build` locally first
- Check for any ESLint errors
- Ensure all dependencies are installed

---

## 🔄 Update Deployment

### Update Backend
1. Push changes to GitHub
2. Render/Railway will auto-deploy (if auto-deploy is enabled)
3. Or manually trigger deployment from dashboard

### Update Frontend
1. Update API_URL if backend URL changed
2. Push changes to GitHub
3. Vercel/Netlify will auto-deploy

---

## 📊 Monitoring

### Render
- View logs: Dashboard → Your Service → Logs
- View metrics: Dashboard → Your Service → Metrics

### Railway
- View logs: Dashboard → Your Project → Deployments
- View metrics: Dashboard → Your Project → Metrics

### Vercel/Netlify
- View deployments: Dashboard → Your Project → Deployments
- View analytics: Dashboard → Your Project → Analytics

---

## 💡 Tips

1. **Use Environment Variables**: Store API_URL in environment variables
2. **Enable Auto-Deploy**: Connect GitHub for automatic deployments
3. **Monitor Performance**: Check logs regularly
4. **Set Up Custom Domain**: Add your own domain name
5. **Enable Analytics**: Track usage and performance

---

## 🎉 Congratulations!

Your AI Task Manager is now live and accessible from anywhere! Share the link and show off your full-stack skills! 🚀

---

**Need help?** Check the documentation:
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
