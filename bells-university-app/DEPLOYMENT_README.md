# Deployment Guide for Bells University App on Render.com

This guide will help you deploy the full-stack Bells University application on Render.com as a single service.

## Prerequisites

1. A Render.com account
2. Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your repository structure looks like this:
```
bells-university-app/
├── backend/
│   ├── package.json
│   ├── index.js
│   └── ...
├── frontend/
│   ├── package.json
│   ├── src/
│   └── ...
├── render.yaml
└── DEPLOYMENT_README.md
```

### 2. Connect to Render

1. Go to [Render.com](https://render.com) and sign in
2. Click "New +" and select "Blueprint" (if using render.yaml) or "Web Service"

### 3. Configure the Service

**If using Blueprint (recommended):**
- Connect your repository
- Render will automatically detect the `render.yaml` file
- The service will be configured based on the YAML file

**If creating manually:**
- Select "Web Service"
- Connect your repository
- Set the following:
  - **Name**: bells-university-app (or your preferred name)
  - **Runtime**: Node
  - **Build Command**: `npm run build`
  - **Start Command**: `npm start`
  - **Root Directory**: `bells-university-app/backend`

### 4. Environment Variables

Add the following environment variable:
- **NODE_ENV**: `production`

### 5. Deploy

Click "Create Web Service" to start the deployment. Render will:
1. Install dependencies
2. Build the frontend
3. Start the backend server

### 6. Access Your App

Once deployed, you'll get a URL like: `https://your-app-name.onrender.com`

## Important Notes

- The app uses LowDB for data storage, which saves data to a JSON file
- File uploads are stored in the `backend/uploads/` directory
- The backend serves both the API and the built frontend
- Client-side routing is handled by serving `index.html` for all non-API routes

## Troubleshooting

- **Build fails**: Check that all dependencies are listed in `backend/package.json`
- **App doesn't load**: Ensure the build process completes successfully
- **API calls fail**: Verify that the frontend is making requests to relative URLs (e.g., `/api/...`)

## File Uploads

The app supports file uploads for business images. Uploaded files are stored in `backend/uploads/` and served at `/uploads/` URLs.

## Database

Data is stored in `backend/db.json`. On Render, this file will persist between deployments but may be lost if the service is suspended.
