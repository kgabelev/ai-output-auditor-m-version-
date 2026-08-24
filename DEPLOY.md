# AOA Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy via GitHub (Automatic)

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ai-accounting-auditor.git
   git branch -M main
   git push -u origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub
   - Click "New Project"
   - Select this repository
   - Click "Deploy"
   - Live in 60 seconds ✓

3. **Share the URL**
   - Vercel gives you a live URL like `https://aoa-demo.vercel.app`
   - Share with prospects immediately

### Option 2: Deploy via CLI (Manual)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from project root**
   ```bash
   cd /path/to/Ai Output Auditor
   vercel
   ```

3. **Follow prompts**
   - Connect GitHub account (if first time)
   - Select project name
   - Accept defaults for framework detection
   - Live in 60 seconds ✓

---

## Environment Variables (Optional)

If you add a backend for storing evaluation history:

1. **In Vercel dashboard:**
   - Go to Settings → Environment Variables
   - Add `VITE_API_URL` = `https://your-api.com`

2. **In `.env.local` (for local dev)**
   ```bash
   VITE_API_URL=http://localhost:3001
   ```

---

## What Gets Deployed

- **Static files:** React app built to `dist/`
- **No backend needed:** Everything runs client-side
- **No database:** Uses browser localStorage for metrics
- **Zero cold start:** Instant page loads

---

## Testing the Deployment

After deploy goes live:

1. **Load the app**
   - Go to your Vercel URL
   - Should see AOA loader screen

2. **Load sample data**
   - Click "Load Sample Batch (6 invoices)"
   - Should see batch overview immediately

3. **Test offline**
   - Works completely offline once loaded
   - All data stays on user's browser

---

## Continuous Deployment

Once connected to GitHub, Vercel auto-deploys on every push to `main`:

1. **Push to main**
   ```bash
   git push origin main
   ```

2. **Vercel auto-builds and deploys** (no manual step needed)

3. **Check deployment status** at vercel.com dashboard

---

## Custom Domain (Optional)

1. **In Vercel dashboard:**
   - Project Settings → Domains
   - Add your domain (e.g., `aoa.yourdomain.com`)
   - Follow DNS setup instructions
   - Live in 10 minutes

---

## Performance Monitoring

Vercel dashboard shows:
- **Page load times** (target: <2s)
- **Error rates** (should be 0)
- **Request logs** (debug any issues)
- **Analytics** (how many prospects are using it)

---

## Troubleshooting

### "Build failed"
- Check `npm run build` works locally first
- Verify Node version: `node --version` (should be 18+)
- Check `package.json` has build script

### "Page loads but shows blank"
- Check browser console for errors (F12)
- Verify JavaScript is enabled
- Clear browser cache and hard-refresh (Ctrl+Shift+R)

### "Sample data won't load"
- Check browser console (F12)
- Verify you're on the right URL
- Try uploading a CSV file instead

---

## What to Tell Prospects

> "This is AOA — our AI accounting output evaluation tool. It's production-grade and runs entirely in your browser. No data upload, no cloud processing. Just load your AI-coded invoices in CSV or JSON, get verdicts and evidence chains, and post straight-through items immediately. The sample data shows our full capability."

---

## Next Steps

1. **Deploy to Vercel** (60 seconds)
2. **Share URL with 5-10 prospects** (discovery calls)
3. **Collect feedback** (what matters most to them)
4. **Iterate rubric** based on their policies
5. **Add their data** and prove ROI

---

## Support

If deployment issues:
- Check Vercel status: https://www.vercelstatus.com
- Review build logs in Vercel dashboard
- Check GitHub Actions (if using GitHub integration)

