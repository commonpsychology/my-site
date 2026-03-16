// vite.config.js
// Add this so hard-refreshing on any route (e.g. /blog) doesn't 404.
// Vite dev-server serves index.html for all unknown paths automatically,
// but you need this explicitly in some setups.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Redirect all 404s back to index.html so the React app can handle routing
    historyApiFallback: true,
  },
})

/*
  If you deploy to Nginx, add this to your server block:
    location / {
      try_files $uri $uri/ /index.html;
    }

  If you deploy to Netlify, create a file: public/_redirects
    /*  /index.html  200

  If you deploy to Vercel, create vercel.json:
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
*/