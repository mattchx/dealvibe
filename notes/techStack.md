# Technology Stack Documentation

## Build System
### Current (Next.js)
- Next.js 15.2.4
- Built-in TypeScript support
- File-based routing
- Integrated build optimization

### Target (Vite)
- Vite latest (to be determined)
- ESBuild for fast builds
- Hot Module Replacement (HMR)
- Native TypeScript support

## Core Technologies
### Framework & Language
- React 19
- TypeScript 5
- ESLint for code quality

### Routing
- Current: Next.js file-based routing
- Target: React Router v6 for client-side routing

### UI Components
- shadcn/ui (based on Radix UI)
- Multiple Radix UI primitives
- Custom components

### Styling
- Tailwind CSS
- PostCSS
- tailwind-merge for className merging
- tailwindcss-animate for animations

### Form Handling
- react-hook-form
- zod for validation

### Additional Libraries
- date-fns for date manipulation
- recharts for charts
- sonner for toast notifications
- Various Radix UI components for UI primitives

## Architecture Decisions

### 1. Build System Migration
**Decision**: Switch to Vite
**Rationale**:
- Faster development server startup
- Efficient hot module replacement
- Better development experience
- Simpler configuration

### 2. Routing Solution
**Decision**: React Router
**Rationale**:
- Industry standard for React SPA routing
- Rich feature set
- Strong community support
- Flexible routing patterns

### 3. Component Architecture
**Decision**: Maintain current component structure
**Rationale**:
- Proven organization
- Clear separation of concerns
- Reusable UI components

### 4. Static Asset Handling
**Decision**: Use Vite's native asset handling
**Rationale**:
- Efficient asset optimization
- Built-in URL handling
- Simplified imports

### 5. Development Tooling
**Decision**: Maintain TypeScript and ESLint
**Rationale**:
- Type safety
- Code quality
- Development productivity

## Migration Considerations
1. **Build Performance**
   - Vite's dev server will provide faster startup
   - ESBuild for efficient production builds

2. **Developer Experience**
   - Maintain hot reloading
   - Preserve type checking
   - Keep existing development tools

3. **Production Optimization**
   - Code splitting
   - Asset optimization
   - Bundle size management

4. **Future Scalability**
   - Easy integration of new tools
   - Flexible routing system
   - Maintainable component structure