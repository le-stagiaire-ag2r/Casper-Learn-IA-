# 🚀 Deployment Guide

## Deployment Architecture

- **Frontend**: GitHub Pages (static site)
- **Backend**: Railway (free tier)

---

## 📦 Backend Deployment (Railway)

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Sign up with GitHub (free)

### Step 2: Deploy Backend

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose `Casper-Learn-IA-`
4. Railway will auto-detect Python

### Step 3: Configure Environment Variables

In Railway dashboard, add these variables:

```
GROQ_API_KEY=your_groq_api_key_here
PORT=8000
```

Get your free Groq API key at: https://console.groq.com

### Step 4: Get Your Backend URL

After deployment, Railway gives you a URL like:
```
https://casper-learn-ia-production.up.railway.app
```

**Copy this URL!** ✅

---

## 🌐 Frontend Configuration

### Update GitHub Repository Secrets

1. Go to your repo: `https://github.com/le-stagiaire-ag2r/Casper-Learn-IA-`
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-railway-url.up.railway.app` (from Step 4)

### Redeploy Frontend

```bash
# Make a small change to trigger redeploy
git commit --allow-empty -m "Trigger redeploy with backend URL"
git push origin main
```

GitHub Actions will rebuild and deploy with the new backend URL.

---

## ✅ Verify Deployment

1. **Backend**: Visit `https://your-railway-url.up.railway.app/health`
   - Should show: `{"status": "healthy"}`

2. **Frontend**: Visit `https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/`
   - Ask a question in the chat
   - Should get AI response! 🎉

---

## 🐛 Troubleshooting

### Backend not starting on Railway

Check logs in Railway dashboard. Common issues:
- Missing `GROQ_API_KEY`
- Port binding (Railway uses `$PORT` env var)

### Frontend still shows localhost error

- Make sure `NEXT_PUBLIC_API_URL` secret is set
- Redeploy: `git push origin main`
- Clear browser cache

### CORS errors

The backend has CORS enabled for all origins. If you see CORS errors:
- Check backend logs
- Verify backend URL is correct
- Try in incognito mode

---

## 💰 Cost

- **GitHub Pages**: FREE ✅
- **Railway Free Tier**:
  - $5 credit per month
  - ~500 hours uptime
  - Enough for hobby projects
  - **FREE** for this project ✅

---

## 🔄 Updates

To update your deployment:

```bash
# Make changes
git add .
git commit -m "Update features"
git push origin main
```

- Frontend: Auto-deploys via GitHub Actions
- Backend: Auto-deploys via Railway

---

## 🎯 Quick Summary

1. ✅ Deploy backend to Railway
2. ✅ Get Railway URL
3. ✅ Add `NEXT_PUBLIC_API_URL` to GitHub Secrets
4. ✅ Redeploy frontend
5. ✅ Test at https://le-stagiaire-ag2r.github.io/Casper-Learn-IA-/

**Total time: ~10 minutes** ⏱️
