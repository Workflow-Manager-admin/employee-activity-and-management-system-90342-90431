# Employee Activity and Management System - Frontend

## Overview

This is the React-based frontend application for the Employee Activity and Management System (TATA ELXSI). It provides a modern, responsive user interface for employees, managers, and administrators to interact with daily work logs, leave requests, team management, and administrative functions.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16.0 or higher
- npm 8.0 or higher
- Backend API running on http://localhost:8000

### Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd employee-activity-and-management-system-90342-90431/frontend_web_app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API connection (optional):**
   ```bash
   # Create .env file for custom configuration
   echo "REACT_APP_API_BASE_URL=http://localhost:8000" > .env
   echo "REACT_APP_API_TIMEOUT=10000" >> .env
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

The application will be available at: **http://localhost:3000**

### Default Login Credentials

- **Email**: `admin@company.com`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials after first login!

## 🔗 Backend Integration Configuration

### API Communication Setup

The frontend communicates with the FastAPI backend through REST APIs. Here's how the integration works:

#### 1. Environment Configuration
Create a `.env` file in the frontend root directory:

```bash
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_API_TIMEOUT=10000

# Optional: Enable debug mode
REACT_APP_DEBUG=true
```

#### 2. API Service Architecture
The application uses a centralized API service (`src/services/apiService.js`) that handles:

- **Automatic Authentication**: JWT tokens are automatically included in requests
- **Error Handling**: Standardized error responses and 401 redirects
- **Request Interceptors**: Token attachment and request preprocessing
- **Response Interceptors**: Error handling and token validation

#### 3. Available API Modules
- `authAPI` - Authentication and user management
- `workLogAPI` - Daily work log operations
- `leaveAPI` - Leave request management
- `employeeAPI` - Employee CRUD operations (Admin)
- `teamAPI` - Team management (Managers)
- `dashboardAPI` - Analytics and statistics
- `reportingAPI` - Data export and reporting
- `auditAPI` - System audit trails (Admin)
- `calendarAPI` - Calendar and event management

### Backend Connection Test
```bash
# Test backend connectivity
curl http://localhost:8000/health

# Expected response:
# {"status": "healthy", "timestamp": "...", "components": {...}}
```

## 📱 Application Features

### 👤 User Roles & Access Control

#### **Employees**
- Submit and edit daily work logs
- View personal activity history
- Submit leave requests
- Receive notifications and reminders
- View team calendar

#### **Managers**
- All employee features plus:
- Review team member work logs
- Provide feedback on employee activities
- Approve/reject leave requests
- Access team productivity dashboards
- Monitor team member performance

#### **Administrators**
- All manager features plus:
- Full employee management (CRUD operations)
- System settings configuration
- Audit trail monitoring
- Bulk employee import/export
- Organization-wide reporting
- Role and hierarchy management

### 🎯 Key Functionality

#### Work Log Management
- **Daily Submissions**: Task descriptions, time tracking, status updates
- **Time-Limited Editing**: Configurable edit window (default: 24 hours)
- **Status Tracking**: In Progress, Completed, Blocked
- **Project Categorization**: Organize work by projects and categories
- **Attachment Support**: Upload documents and screenshots

#### Leave Request Workflow
- **Simple Submission**: Date range, leave type, reason
- **Approval Routing**: Automatic routing to assigned manager
- **Status Tracking**: Pending, Approved, Rejected with history
- **Calendar Integration**: Visual representation of approved leaves

#### Dashboard & Analytics
- **Personal Metrics**: Individual productivity and activity trends
- **Team Overview**: Manager dashboards with team performance
- **System Analytics**: Admin-level organizational insights
- **Visual Charts**: Graphs and charts for data visualization

## 🛠️ Development Scripts

```bash
# Start development server with hot reload
npm start

# Run test suite
npm test

# Run tests in CI mode (non-interactive)
CI=true npm test

# Build production bundle
npm run build

# Lint code for quality
npm run lint

# Format code (if configured)
npm run format
```

## 🧪 Testing the Full Stack Integration

### 1. System Health Check
```bash
# Verify backend is running
curl http://localhost:8000/health
```

### 2. Frontend Startup Test
```bash
# Start frontend (should open browser automatically)
npm start

# Manual verification at:
# http://localhost:3000
```

### 3. Authentication Flow Test
1. **Navigate to login page**: http://localhost:3000/login
2. **Enter default credentials**:
   - Email: `admin@company.com`
   - Password: `admin123`
3. **Verify successful login**: Should redirect to dashboard
4. **Test navigation**: Access different sections based on role

### 4. API Integration Verification
Open browser developer tools and monitor network requests:

```javascript
// Test in browser console
// Check if API service is properly configured
console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);

// Test authentication
localStorage.getItem('authToken'); // Should show JWT token after login
```

### 5. Feature Testing Checklist

#### For All Users:
- [ ] Login/logout functionality
- [ ] Dashboard displays personal metrics
- [ ] Work log submission and editing
- [ ] Leave request creation
- [ ] Notification viewing
- [ ] Profile management

#### For Managers (additional):
- [ ] Team dashboard access
- [ ] Team member work log review
- [ ] Feedback submission
- [ ] Leave request approvals
- [ ] Team productivity reports

#### For Admins (additional):
- [ ] Employee management (CRUD)
- [ ] System settings access
- [ ] Audit trail viewing
- [ ] Bulk operations
- [ ] Organization-wide reports

## 🎨 UI/UX Architecture

### Design System
The application uses a custom design system with TATA ELXSI branding:

```css
/* Brand Colors */
--primary-blue: #25488A
--secondary-purple: #A42B8D
--accent-yellow: #F5C400
--accent-pink: #D81D6D
--bg-canvas: #FFFFFF
--light-bg: #F5F6FB
```

### Component Structure
```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Main navigation header
│   ├── Footer.js       # Application footer
│   ├── Navbar.js       # Navigation bar
│   ├── Sidebar.js      # Side navigation (if needed)
│   └── *.js           # Other reusable components
├── pages/              # Page-level components
│   ├── Dashboard.js    # Main dashboard
│   ├── WorkLog.js      # Work log management
│   ├── LeaveRequests.js # Leave management
│   ├── AdminPanel.js   # Admin interface
│   └── *.js           # Other page components
├── contexts/           # React contexts
│   └── UserContext.js  # User authentication context
├── services/           # API and external services
│   └── apiService.js   # Backend API integration
└── App.js             # Main application component
```

### Responsive Design
- **Mobile-first approach**: Optimized for mobile devices
- **Responsive breakpoints**: Supports tablets and desktops
- **Touch-friendly**: Large touch targets and swipe gestures
- **Cross-browser compatibility**: Tested on major browsers

## 🔐 Security Features

### Frontend Security Measures
- **JWT Token Management**: Secure token storage and automatic refresh
- **Route Protection**: Role-based access control for pages
- **Input Validation**: Client-side validation with server-side backup
- **XSS Prevention**: Sanitized user inputs and outputs
- **CSRF Protection**: Token-based request validation

### Authentication Flow
```javascript
// Login process
1. User submits credentials
2. Frontend sends POST to /auth/login
3. Backend validates and returns JWT token
4. Frontend stores token in localStorage
5. All subsequent requests include Authorization header
6. Automatic logout on token expiration or 401 responses
```

## 🚀 Production Deployment

### Build Configuration
```bash
# Create production build
npm run build

# The build/ folder contains optimized static files ready for deployment
```

### Environment Variables for Production
```bash
# Production .env file
REACT_APP_API_BASE_URL=https://your-api-domain.com
REACT_APP_API_TIMEOUT=30000
REACT_APP_ENVIRONMENT=production
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, AWS S3 + CloudFront
- **Docker**: Containerized deployment with nginx
- **Traditional Hosting**: Apache or nginx with static files

### Performance Optimization
- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Browser caching for static assets

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. API Connection Problems
```bash
# Check if backend is running
curl http://localhost:8000/health

# Verify CORS configuration in backend
# Check browser console for CORS errors
```

#### 2. Authentication Issues
```bash
# Clear stored tokens
localStorage.clear()

# Check token expiration
# Verify credentials with backend directly
```

#### 3. Build/Dependency Issues
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Update dependencies
npm update
```

#### 4. Development Server Issues
```bash
# Kill process on port 3000
npx kill-port 3000

# Start with different port
PORT=3001 npm start
```

### Debug Mode
Enable detailed logging by setting:
```bash
REACT_APP_DEBUG=true
```

### Browser Console Debugging
```javascript
// Check API configuration
console.log('Environment:', process.env.NODE_ENV);
console.log('API URL:', process.env.REACT_APP_API_BASE_URL);

// Check authentication status
console.log('Auth Token:', localStorage.getItem('authToken'));

// Test API connectivity
fetch(process.env.REACT_APP_API_BASE_URL + '/health')
  .then(r => r.json())
  .then(console.log);
```

## 📚 Additional Resources

### Documentation
- **API Documentation**: http://localhost:8000/docs (Swagger UI)
- **React Documentation**: https://reactjs.org/docs
- **Component Library**: Custom components in `/src/components`

### Development Tools
- **React Developer Tools**: Browser extension for React debugging
- **Network Tab**: Monitor API requests and responses
- **Console Logging**: Built-in debug logging with REACT_APP_DEBUG=true

### Code Quality
- **ESLint**: Configured for React best practices
- **Prettier**: Code formatting (if configured)
- **Jest Testing**: Unit tests for components and utilities

## 🤝 Contributing

### Development Workflow
1. Create feature branch from main
2. Implement changes with tests
3. Verify integration with backend
4. Submit pull request with documentation

### Code Standards
- Follow React best practices and hooks patterns
- Use functional components with hooks
- Implement proper error handling
- Write comprehensive tests for new features
- Update documentation for API changes

---

**Version**: 1.0.0  
**Framework**: React 18.2  
**Last Updated**: July 31, 2025  
**License**: Proprietary