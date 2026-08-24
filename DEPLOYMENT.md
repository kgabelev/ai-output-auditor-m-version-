# Deployment Guide

This tool is designed to be deployed anywhere. It's 100% client-side — no backend needed.

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` with hot reload.

## Production Build

```bash
npm run build
```

Creates optimized bundle in `dist/` folder (~200KB gzipped).

## Deploy Options

### 1. **Vercel** (Recommended — 30 seconds)

```bash
npm install -g vercel
vercel
```

Vercel auto-detects it's a Vite app. Builds and deploys. Done.

**Pros:** Instant, free tier, auto-HTTPS, edge caching
**Cons:** US-based (check data residency if needed)

### 2. **AWS S3 + CloudFront**

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name/

# Create CloudFront distribution pointing to S3
# (via AWS Console or CDK)
```

**Pros:** Scalable, geographically distributed, HIPAA-eligible
**Cons:** Manual setup, need AWS account

### 3. **GitHub Pages**

```bash
# Add to package.json:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Pros:** Free, no backend needed
**Cons:** Public URL (deploy to private GitHub org if needed)

### 4. **Docker** (For internal deployment)

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

```bash
docker build -t ai-accounting-auditor .
docker run -p 3000:3000 ai-accounting-auditor
```

### 5. **Internal Server** (Nginx)

```bash
# Build
npm run build

# Copy dist/ to your server
# Create Nginx config:
```

**nginx.conf:**
```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    root /var/www/auditor;
    index index.html;
    try_files $uri /index.html;
  }
}
```

```bash
# Restart Nginx
sudo systemctl restart nginx
```

## Security Considerations

### 1. **Data Privacy**
- All scoring runs on the client's browser
- No data is sent to any server
- No telemetry, no logging, no tracking
- Safe to use with real invoice data

### 2. **HTTPS**
- Use HTTPS in production (Vercel does this automatically)
- All connections should be encrypted
- If self-hosting, configure TLS certificate

### 3. **Access Control**
If deploying internally (not public):
- Use HTTP Basic Auth (Nginx)
- Restrict to corporate IP ranges
- Use single sign-on (OAuth, SAML)

**Example Nginx Basic Auth:**
```nginx
location / {
  auth_basic "Restricted";
  auth_basic_user_file /etc/nginx/.htpasswd;
  ...
}
```

### 4. **Browser Compatibility**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- No IE support (it's 2026, you're fine)

## Environment Variables

This app doesn't use environment variables. Everything is hardcoded for simplicity.

If you want to make it configurable:

Create `src/config.ts`:
```typescript
export const config = {
  scoringThreshold: 80,  // % to pass
  rubricVersion: '1.0',
  supportEmail: 'support@example.com',
};
```

Then import in `src/App.tsx`:
```typescript
import { config } from './config';
```

## Monitoring

Since there's no backend, monitoring is simple:

1. **Uptime:** Check HTTP status code (should be 200)
2. **Performance:** Monitor page load time (target: <2s)
3. **Errors:** Check browser console for JavaScript errors

If using Vercel: Use built-in analytics dashboard.

## Updates

To deploy an update:

1. Make changes to code
2. Commit to git
3. Push to main branch
4. CI/CD pipeline (if using Vercel) auto-deploys
5. Or manually run `npm run build && deploy`

No database migrations needed. No downtime. Instant deployment.

## Custom Domain

### Vercel
```bash
vercel domains add your-domain.com
# Follow DNS instructions
```

### AWS S3 + CloudFront
1. Create certificate in ACM
2. Add certificate to CloudFront distribution
3. Point domain DNS to CloudFront

### Self-hosted
1. Buy domain
2. Point DNS to your server IP
3. Configure SSL certificate (Let's Encrypt free)
4. Update Nginx config with domain name

## Cost

| Option | Cost |
|--------|------|
| Vercel (free tier) | $0 |
| AWS S3 + CloudFront | ~$5-50/month |
| GitHub Pages | $0 |
| Self-hosted VPS | $10-50/month |

For a few hundred users per month, Vercel free tier is fine.
For thousands of users, AWS or self-hosted is more cost-effective.

## Backups

No backups needed. The code is your backup.

If you want to archive:
```bash
git tag -a v1.0 -m "Release version 1.0"
git push origin v1.0
```

## Scaling

**Current limits:**
- Can score 1,000 invoices in ~5 seconds
- File upload limited to browser memory (typically 500MB+)
- No concurrent users limit (all client-side)

**If you need more:**
- Add pagination for large datasets (>10k invoices)
- Add local storage to save scored results
- Add export to cloud storage (S3, Google Drive)

Nothing requires backend changes.

## Maintenance

### Weekly
- Monitor error logs (if deployed)
- Check for browser compatibility issues

### Monthly
- Review and update dependency security patches
```bash
npm audit
npm update
```

### Quarterly
- Update rubric based on customer feedback
- Add new evaluation criteria if needed
- Rebuild and redeploy

## Disaster Recovery

If the app goes down:

1. Rebuild from source: `npm run build`
2. Deploy to backup server
3. Update DNS to backup server
4. Restore from git if code was lost

Since there's no database, there's nothing to restore.

## Support

If a customer reports an issue:

1. Check browser console for error message
2. Test in Chrome (rule out browser-specific issue)
3. Check that CSV/JSON format is correct
4. Rebuild and redeploy if code issue

## Next Steps

1. **Build:** `npm run build`
2. **Test:** Open `dist/index.html` in browser
3. **Deploy:** Choose one of the options above
4. **Share:** Send URL to prospects for discovery calls
5. **Monitor:** Keep an eye on usage and error logs

---

**You've got a tool that's ready to ship. Deploy it today.**
