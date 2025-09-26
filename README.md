# FitnessPro - Complete Fitness Platform

A comprehensive Next.js fitness platform featuring user authentication, personalized workout plans, nutrition tracking, progress monitoring, and admin management.

## 🚀 Features

### Core Features
- **User Authentication**: Complete auth system with NextAuth.js
- **Dashboard**: Personalized user dashboard with analytics
- **Fitness Plans**: Browse and subscribe to workout programs  
- **Nutrition Tracker**: Log meals and track macronutrients
- **Progress Tracking**: Monitor fitness journey with photos and metrics
- **Admin Panel**: Comprehensive admin controls for content management

### Technical Features
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Dark Mode**: System-wide dark/light theme support
- **Animations**: Smooth animations with Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Type Safety**: Full TypeScript implementation
- **API Routes**: RESTful API design
- **Middleware**: Authentication and route protection

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js with JWT
- **Database**: PostgreSQL with Prisma
- **State Management**: React Context + Hooks
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/fitness-platform.git
cd fitness-platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/fitness_platform"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
JWT_SECRET="your-jwt-secret"
```

4. **Set up the database**
```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Optional: Open Prisma Studio
npm run db:studio
```

5. **Start the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗 Project Structure

```
fitness-platform/
├── app/                      # Next.js 13+ App Router
│   ├── api/                  # API Routes
│   │   └── auth/            # Authentication endpoints
│   ├── auth/                # Auth pages (signin, signup)
│   ├── dashboard/           # User dashboard
│   ├── plans/               # Fitness plans page
│   ├── nutrition/           # Nutrition tracker
│   ├── progress/            # Progress tracking
│   ├── admin/               # Admin panel
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # Reusable components
│   ├── Navbar.tsx           # Navigation component
│   ├── Footer.tsx           # Footer component
│   └── ui/                  # UI components
├── contexts/                # React contexts
│   ├── AuthContext.tsx      # Authentication context
│   └── ThemeContext.tsx     # Theme context
├── lib/                     # Utility libraries
│   ├── auth.ts              # Auth configuration
│   ├── prisma.ts            # Prisma client
│   └── utils.ts             # Helper functions
├── prisma/                  # Database schema
│   └── schema.prisma        # Prisma schema
├── middleware.ts            # Next.js middleware
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Dependencies
```

## 🔐 Authentication

The platform uses NextAuth.js with credential-based authentication:

- **Sign Up**: Create new user accounts with email verification
- **Sign In**: Secure login with JWT tokens
- **Password Reset**: Email-based password recovery
- **Role-based Access**: User and Admin roles
- **Middleware Protection**: Route-level authentication

## 📊 Database Schema

Key database models:
- **User**: User accounts and profiles
- **FitnessPlan**: Workout programs and plans
- **Workout**: Individual workout sessions
- **Exercise**: Exercise definitions
- **Subscription**: User plan subscriptions
- **WorkoutLog**: Completed workout tracking
- **NutritionLog**: Food and nutrition tracking
- **ProgressPhoto**: Progress photo uploads
- **Notification**: User notifications

## 🎨 UI/UX Features

### Design System
- **Colors**: Primary/secondary color schemes with dark mode
- **Typography**: Clean, readable font hierarchy
- **Components**: Reusable button, input, and card components
- **Animations**: Smooth micro-interactions and transitions

### Responsive Design
- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Adapted layouts for tablets
- **Desktop Enhanced**: Full features on desktop

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production
```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
JWT_SECRET="your-production-jwt-secret"
```

## 🧪 Development

### Running Tests
```bash
npm run test
```

### Code Quality
```bash
# ESLint
npm run lint

# Type checking
npm run type-check
```

### Database Management
```bash
# Reset database
npm run db:reset

# Seed database
npm run db:seed

# Generate migration
npx prisma migrate dev --name migration-name
```

## 📈 Features Roadmap

### Phase 1 (Current)
- ✅ User authentication and authorization
- ✅ Basic dashboard with analytics
- ✅ Fitness plans browsing
- ✅ Nutrition tracking
- ✅ Progress monitoring

### Phase 2
- [ ] Workout video streaming
- [ ] Social features and community
- [ ] Mobile app (React Native)
- [ ] Payment integration
- [ ] Advanced analytics

### Phase 3
- [ ] AI-powered workout recommendations
- [ ] Wearable device integrations
- [ ] Marketplace for trainers
- [ ] Advanced meal planning
- [ ] Virtual personal training

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@fitnesspro.com
- Documentation: [docs.fitnesspro.com](https://docs.fitnesspro.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Prisma](https://prisma.io/) for database management
- [Framer Motion](https://framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for beautiful icons

---

Built with ❤️ by the FitnessPro team