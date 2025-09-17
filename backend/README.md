# Adalah Chain Backend API

Backend API for Adalah Chain - A Shariah-compliant smart contracts platform for Islamic finance.

## Features

- **User Authentication**: Individual and Capital Provider user registration and authentication
- **JWT-based Security**: Secure token-based authentication with refresh tokens
- **MongoDB Integration**: Robust data persistence with Mongoose ODM
- **Input Validation**: Comprehensive request validation using express-validator
- **Security Middleware**: Helmet, CORS, rate limiting, and other security measures
- **Error Handling**: Centralized error handling and logging
- **API Documentation**: Well-structured RESTful API endpoints

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

### Health Check

- `GET /health` - API health status

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Update environment variables in `.env` file

4. Start the server:

```bash
# Development
npm run dev

# Production
npm start
```

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/adalah-chain

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_REFRESH_EXPIRE=30d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@adalahchain.com

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

## Database Schema

### Individual User Schema

- Personal information (name, email, employment, income)
- Contact details (phone, address)
- Document storage (ID, salary certificate, bank statements)
- Biometric data (encrypted)
- Verification status
- Digital passport information
- MPA agreement status

### Capital Provider Schema

- Institution information
- Regulatory compliance data
- Risk profile configuration
- Contact information
- Portfolio management
- Verification status
- Digital passport information

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Error handling without sensitive data exposure

## Development

### Project Structure

```
backend/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic services
├── utils/           # Utility functions
└── src/            # Main application files
```

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Include input validation
4. Write comprehensive tests
5. Update documentation

## License

MIT License - see LICENSE file for details
