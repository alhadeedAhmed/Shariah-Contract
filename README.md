# Adalah Chain - Shariah-Compliant Smart Contracts Platform

A comprehensive platform for Islamic finance that automates Murabahah, Musharakah, and other Islamic contracts with AI-powered Shariah validation, digital passports, and transparent blockchain technology.

## Project Structure

```
SharaiahContract/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express + MongoDB backend
├── start-backend.bat  # Windows script to start backend
├── start-frontend.bat # Windows script to start frontend
└── README.md         # This file
```

## Features

### Frontend (React + TypeScript)

- Modern UI with Tailwind CSS and shadcn/ui components
- Multi-role authentication (Individual, Capital Provider, Business, Scholar, Admin)
- Responsive design with beautiful animations
- Form validation and error handling
- State management with React Context

### Backend (Node.js + Express + MongoDB)

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- JWT-based authentication with refresh tokens
- Input validation and security middleware
- Support for Individual and Capital Provider users
- Comprehensive error handling

## User Types

### Individual Users

- Personal information and employment details
- Document upload and verification
- Biometric data storage (encrypted)
- Shariah Digital Passport generation
- MPA (Master Platform Agreement) acceptance

### Capital Providers

- Institution registration and compliance verification
- Regulatory license management
- Risk profile configuration
- Portfolio management
- Product offerings setup

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd SharaiahContract
   ```

2. **Start the Backend**

   ```bash
   # Windows
   start-backend.bat

   # Or manually
   cd backend
   npm install
   npm run dev
   ```

3. **Start the Frontend**

   ```bash
   # Windows
   start-frontend.bat

   # Or manually
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## API Endpoints

### Authentication

- `POST /api/auth/individual/signup` - Individual user registration
- `POST /api/auth/individual/signin` - Individual user login
- `POST /api/auth/capital-provider/signup` - Capital provider registration
- `POST /api/auth/capital-provider/signin` - Capital provider login
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/signout` - User logout
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/verify-email` - Email verification

## Environment Setup

### Backend Environment Variables

Create `backend/.env` file:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/adalah-chain
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_REFRESH_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

## Development

### Frontend Development

```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend Development

```bash
cd backend
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run tests
npm run lint         # Run ESLint
```

## Technology Stack

### Frontend

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui component library
- Framer Motion for animations
- React Router for navigation
- React Hook Form for form handling

### Backend

- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- express-validator for input validation
- Helmet for security
- CORS for cross-origin requests
- Morgan for logging

## Security Features

- Password hashing with bcrypt
- JWT token authentication with refresh tokens
- Rate limiting to prevent abuse
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Error handling without sensitive data exposure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please contact the development team or create an issue in the repository.
