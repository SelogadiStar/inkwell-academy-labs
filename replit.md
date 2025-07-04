# Inkwell Academy - South African Science Education Platform

## Project Overview
A comprehensive digital platform for South African science education, empowering Grades 7-12 learners through interactive and curriculum-aligned laboratory tools. The platform combines traditional web technologies with cutting-edge AR/VR capabilities to deliver immersive science education experiences.

## Current Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript, Wouter for routing
- **Backend**: Express.js with PostgreSQL (Neon Database)
- **UI Framework**: Tailwind CSS + Radix UI components (shadcn/ui)
- **State Management**: TanStack Query for server state
- **Database ORM**: Drizzle ORM with Zod validation
- **Payment Processing**: Stripe integration
- **AR/VR**: A-Frame, AR.js, React Three Fiber
- **Authentication**: Passport.js with local strategy

### Core Features

#### 1. Curriculum-Aligned Science Experiments
- **Grades**: 7-12 support with CAPS curriculum alignment
- **Topics**: Physics, Chemistry, Biology, Earth Sciences
- **Interactive Experiments**: Step-by-step guided laboratory simulations
- **Materials Management**: Digital inventory and requirements tracking
- **Progress Tracking**: Individual student progress monitoring

#### 2. AR/VR Laboratory Experiences
- **AR Experiments**: Mobile-friendly AR overlays for real-world experiments
- **3D Visualizations**: Complex scientific concepts in interactive 3D
- **Virtual Lab Equipment**: Digital microscopes, measuring tools, chemical apparatus

#### 3. User Management & Authentication
- **Student Registration**: Comprehensive profile including school, grade, subjects
- **Progress Dashboard**: Personal achievement tracking and experiment history
- **Subscription Management**: Tiered access with Stripe integration

#### 4. Science Buddy AI Assistant
- **Interactive Chat**: AI-powered science questions and explanations
- **Daily Science Facts**: Curated educational content
- **Contextual Help**: Experiment-specific guidance and tips

#### 5. Monetization & Advertising
- **Google AdSense Integration**: Revenue generation through targeted ads
- **Custom Ad System**: Branded educational content promotion
- **Subscription Tiers**: Premium features and ad-free experience

### Database Schema
- **Users**: Student profiles with demographic and academic information
- **Grades**: Educational levels (7-12)
- **Topics**: Subject categorization within grades
- **Experiments**: Detailed laboratory procedures and content
- **Materials/Resources**: Equipment and reference materials
- **Progress Tracking**: User experiment completion and achievements
- **Science Facts**: Educational content for AI assistant

### Recent Changes
- **2025-07-04**: ✅ COMPLETED: Implemented comprehensive Firebase authentication flow with landing page, login, and registration
- **2025-07-04**: ✅ Added Firestore integration for user data storage including membership tracking
- **2025-07-04**: ✅ Created protected dashboard with grade selection and subject navigation
- **2025-07-04**: ✅ Built subject-specific pages for Science, English, and Mathematics with grade-based content
- **2025-07-04**: ✅ Integrated user authentication state management with automatic redirects
- **2025-06-30**: ✅ RESOLVED: Fixed critical server connectivity issues after comprehensive troubleshooting
- **2025-06-30**: ✅ Successfully implemented working Express server with proper ES module configuration  
- **2025-06-30**: ✅ Created functional mobile app-like interface with three-tab navigation system
- **2025-06-29**: ESCALATED AND RESOLVED: Critical server connectivity and port binding issues
- **2025-06-29**: Fixed server initialization sequence to properly accept connections
- **2025-06-29**: Implemented enhanced server startup logging and error tracking
- **2025-06-28**: Implemented multi-subject navigation system with "Inkwell Academy Labs" branding
- **2025-06-28**: Created new Navbar component with dropdown menus for Science, English, and Math
- **2025-06-28**: Updated App.tsx routing structure to support multi-subject platform
- **2025-06-28**: Fixed TypeScript compilation errors preventing navigation functionality
- **2025-06-28**: Fixed security vulnerability by moving AdSense credentials to environment variables
- **2025-06-28**: Updated contact email to info@inkwellacademy.org

## User Preferences
- Professional, educational tone in communications
- Focus on South African curriculum alignment
- Emphasis on accessibility and mobile-friendly design
- Security-conscious development practices

## Deployment Status
- **Environment**: Development on Replit
- **Database**: PostgreSQL hosted on Neon (currently experiencing connection issues)
- **Port**: Running on port 5000
- **Status**: Active development, ready for testing phase