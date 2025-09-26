# Deployment Guide - FitnessPro Platform

This guide covers deploying the FitnessPro fitness platform to various hosting providers.

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- Vercel account
- GitHub repository with your code
- PostgreSQL database (Supabase, Railway, or PlanetScale recommended)

### Steps

1. **Connect Repository**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (see below)

3. **Environment Variables**
   Add these in Vercel's dashboard under Settings > Environment Variables:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   NEXTAUTH_SECRET="your-secure-random-secret"
   JWT_SECRET="your-jwt-secret"
   
   # Email configuration (optional)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="noreply@yourdomain.com"
   
   # Image uploads (optional)
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Database Setup**
   ```bash
   # After deployment, run database migrations
   npx prisma db push
   
   # Optional: Seed with initial data
   npx prisma db seed
   ```

## 🗄️ Database Options

### Option 1: Supabase (Recommended for beginners)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database
4. Use the connection string as `DATABASE_URL`

### Option 2: Railway
1. Create account at [railway.app](https://railway.app)
2. Create PostgreSQL service
3. Get connection details from Variables tab
4. Construct connection string

### Option 3: PlanetScale (MySQL)
1. Create account at [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Update Prisma schema to use MySQL instead of PostgreSQL

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/fitness
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=fitness
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Deploy with Docker
```bash
# Build and run
docker-compose up -d

# Run database migrations
docker-compose exec app npx prisma db push
```

## ☁️ AWS Deployment

### Using AWS Amplify
1. Connect GitHub repository
2. Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
           - npx prisma generate
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```
3. Set environment variables in Amplify console
4. Deploy

### Using EC2 + RDS
1. Launch EC2 instance (Ubuntu 20.04 LTS)
2. Create RDS PostgreSQL database
3. Install Node.js and PM2:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```
4. Deploy application:
   ```bash
   git clone your-repo
   cd fitness-platform
   npm ci
   npx prisma generate
   npx prisma db push
   npm run build
   pm2 start npm --name "fitness-app" -- start
   ```

## 🌐 Custom Domain Setup

### Vercel
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records as shown
4. Wait for SSL certificate provisioning

### Cloudflare (Optional)
1. Add domain to Cloudflare
2. Update nameservers
3. Enable proxy (orange cloud)
4. Configure SSL/TLS settings

## 📊 Monitoring & Analytics

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### Error Monitoring with Sentry
```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.js`:
```javascript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use strong, unique secrets for production
- Rotate secrets regularly

### Database Security
- Use connection pooling
- Enable SSL connections
- Regular backups
- Monitor for suspicious activity

### Application Security
- Keep dependencies updated
- Use HTTPS everywhere
- Implement rate limiting
- Regular security audits

## 🚀 Performance Optimization

### Build Optimization
```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
    optimizeImages: true,
  },
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
}
```

### CDN Setup
- Use Vercel's global CDN (automatic)
- Or configure Cloudflare for additional caching
- Optimize images with Next.js Image component

### Database Performance
- Add database indexes for frequently queried fields
- Use connection pooling
- Implement caching strategies

## 📋 Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] SSL certificates configured
- [ ] Domain DNS configured
- [ ] Error monitoring setup
- [ ] Backup strategy implemented
- [ ] Performance testing completed
- [ ] Security audit passed

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Verify database server is accessible
   - Check firewall settings

2. **Build Failures**
   - Clear `.next` directory
   - Check for TypeScript errors
   - Verify all dependencies are installed

3. **Authentication Issues**
   - Verify NEXTAUTH_URL matches deployment URL
   - Check NEXTAUTH_SECRET is set
   - Confirm callback URLs in OAuth providers

### Getting Help
- Check application logs
- Review Vercel/platform documentation
- Create GitHub issue with error details
- Contact support team

---

## 📞 Support

For deployment assistance:
- 📧 Email: devops@fitnesspro.com
- 💬 Discord: [FitnessPro Community](https://discord.gg/fitnesspro)
- 📖 Documentation: [docs.fitnesspro.com](https://docs.fitnesspro.com)

Happy deploying! 🚀