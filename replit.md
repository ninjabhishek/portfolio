# Portfolio Website

## Overview

This is a modern, responsive portfolio website built for a Senior Software Engineer at Mastercard. The application showcases professional experience, technical skills, and projects through an interactive, animated interface with dark/light theme support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and scroll-triggered animations
- **State Management**: React hooks and context for theme and search functionality
- **Data Fetching**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Build System**: ESBuild for server-side bundling

### Key Components

1. **Portfolio Sections**
   - Hero section with animated introduction
   - About section with personal information and social links
   - Experience timeline with professional history
   - Skills showcase with categorized technical abilities
   - Projects gallery with detailed descriptions
   - Contact form with Google Sheets integration

2. **Interactive Features**
   - Global search functionality with fuzzy matching
   - Dark/light theme toggle with system preference detection
   - Smooth scroll navigation between sections
   - Responsive mobile-first design
   - Loading states and error handling

3. **UI System**
   - Glassmorphism design effects
   - Gradient text and backgrounds
   - Animated floating elements
   - Custom scrollbar and hover effects
   - Accessible components with proper ARIA labels

## Data Flow

1. **Client-Side Rendering**: React application renders on the client with initial data
2. **Theme Management**: Theme preference stored in localStorage and applied via CSS variables
3. **Search Functionality**: Local search using Fuse.js for fuzzy matching across portfolio content
4. **Contact Form**: Form submissions sent to Google Sheets via Web Apps API
5. **Navigation**: Smooth scrolling between sections with intersection observers for active states

## External Dependencies

### Frontend Libraries
- **UI Framework**: React, React DOM
- **Animations**: Framer Motion, React Intersection Observer
- **Forms**: React Hook Form, Zod validation
- **Search**: Fuse.js for fuzzy search
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

### Backend Libraries
- **Server**: Express.js
- **Database**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod for schema validation
- **Session**: Connect-pg-simple for PostgreSQL session store
- **Utilities**: Date-fns for date manipulation

### Development Tools
- **Build**: Vite, ESBuild
- **TypeScript**: Full type safety across frontend and backend
- **CSS**: Tailwind CSS with PostCSS
- **Database**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Development
- Vite dev server for frontend with HMR
- Express server with TypeScript compilation via tsx
- In-memory storage for rapid development
- Environment variables for configuration

### Production
1. **Frontend Build**: Vite builds optimized static assets
2. **Backend Build**: ESBuild compiles TypeScript to JavaScript
3. **Database**: Neon Database serverless PostgreSQL
4. **Deployment**: Single Node.js process serving both API and static files
5. **Environment**: Production configuration with proper error handling

### Database Schema
- **Users Table**: Basic user management with username/password
- **PostgreSQL**: Configured with Drizzle ORM for type-safe queries
- **Migrations**: Schema changes managed through Drizzle Kit

### External Integrations
- **Google Sheets**: Contact form submissions stored in Google Sheets
- **Email Notifications**: Optional email alerts for new contact submissions
- **Analytics**: Ready for Google Analytics or similar tracking integration

The application follows modern web development best practices with a focus on performance, accessibility, and user experience. The modular architecture allows for easy maintenance and feature additions.