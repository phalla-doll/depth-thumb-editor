# AGENTS.md

This file contains guidelines for AI agents working in the DepthThumb Editor repository.

## Build / Lint / Test Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run clean     # Clean Next.js cache
```

**Note:** No test framework is currently configured. Add tests before introducing complex logic.

## Code Style Guidelines

### Imports
- Use ES6 imports consistently
- Import React as namespace: `import * as React from "react"`
- Use named imports from libraries where possible
- Explicitly mark type imports: `import { type ClassValue } from "clsx"`

### Formatting
- TypeScript strict mode enabled in tsconfig.json
- Use Tailwind CSS for all styling with `cn()` utility from `lib/utils.ts`
- Keep components functional with hooks
- 2-space indentation for CSS

### Types
- Type annotations required for function parameters
- Explicit return types for exported functions
- Avoid `any` types; use `unknown` or proper interfaces

### Naming Conventions
- **Components**: PascalCase (`Header`, `LeftSidebar`)
- **Functions**: camelCase (`useIsMobile`, `cn`)
- **Constants**: UPPER_SNAKE_CASE (`MOBILE_BREAKPOINT`)
- **Variables**: camelCase (`selectedFont`, `fonts`)
- **Hooks**: Prefix with `use` (`useEffect`, `useIsMobile`)

### Error Handling
- Use `.catch()` for promises with `console.error()`
- Wrap localStorage/sessionStorage in try-catch
- Provide fallback values for errors

### Component Guidelines
- Use functional components with hooks
- Add `'use client'` directive at top for client components
- Extract large components into separate files when >200 lines
- Use `React.memo()` for expensive components with stable props

### React Best Practices
- Use functional setState updates to prevent stale closures
- Use lazy state initialization for expensive initial values
- Use `useCallback` for stable function references
- Use `useMemo` for expensive computations
- Prefer derived state over state + useEffect
- Put interaction logic in event handlers, not effects

### Styling
- Use Tailwind CSS utility classes
- Define theme colors in `app/globals.css` with `@theme`
- Use CSS variables for theme values (`--color-primary`)
- Avoid inline styles except for dynamic values

### File Structure
- Components in `app/` for pages and layouts
- Create `app/components/` for reusable components
- Hooks in `hooks/`, utilities in `lib/`
- Use descriptive filenames (PascalCase for components)

### API Integration
- Use `fetch` for API calls with loading/error/data states
- Use `React.cache()` for server-side deduplication

### Environment Variables
- Define in `.env.example`, access via `process.env.VARIABLE_NAME`
- Never commit `.env.local` or secrets

### Performance
- Use `next/dynamic` for heavy components
- Import specific icons directly: `import Check from 'lucide-react/dist/esm/icons/check'`
- Minimize re-renders with `React.memo()`

### Accessibility
- Use semantic HTML elements
- Add `aria-label` for icon-only buttons
- Ensure keyboard navigation and proper heading hierarchy

## Linting Rules

- ESLint extends `eslint-config-next`
- React strict mode enabled in `next.config.ts`
- Fix all lint errors before committing
- Run `npm run lint` to check code quality

## When Adding New Features

1. Create a new branch for the feature
2. Write the code following guidelines above
3. Test manually (no automated tests currently)
4. Run `npm run lint` and fix issues
5. Build with `npm run build` to verify
6. Commit with clear, descriptive messages
7. Submit pull request for review
