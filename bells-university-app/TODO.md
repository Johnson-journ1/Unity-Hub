# TODO: Revert Code to Run Locally

- [ ] Modify `backend/index.js` to serve frontend static files and catch-all only in production (`NODE_ENV === 'production'`)
- [ ] Add proxy in `frontend-vite/vite.config.js` to forward `/api` requests to `http://localhost:3000`
- [ ] Update build script in `backend/package.json` to build `frontend-vite` instead of `frontend`
