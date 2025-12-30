# Deployment Guide - Production Ready

## Vercel Deployment

1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy

```bash
git push origin main
```

## Self-Hosted Deployment (Docker)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t priyaherbal .
docker run -p 3000:3000 --env-file .env.production priyaherbal
```

## Database Backup

```bash
pg_dump $DATABASE_URL > backup.sql
```

## Monitoring

1. Use Vercel Analytics
2. Set up Sentry for error tracking
3. Monitor Ollama performance
4. Track email delivery rates

## Security Checklist

- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Database RLS enabled
- [ ] API rate limiting enabled
- [ ] CORS configured
- [ ] CSRF protection enabled
- [ ] Regular backups scheduled
- [ ] Logs monitored
- [ ] Secrets rotated

All systems ready for production!
