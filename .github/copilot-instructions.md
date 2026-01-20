# GitHub Copilot Instructions for P-Hero Project

## Project Overview
Next.js 16 (App Router) educational platform with TypeScript, Tailwind CSS 4, and Framer Motion. Supports bilingual content (English/Bengali) with focus on reusable component architecture.

## Architecture Patterns

### Component Structure: Template + Content Provider
**Critical Pattern**: All sections follow a two-tier architecture where template components define structure and page-specific components provide content via props.

**Template Component** (`src/components/`):
```tsx
// Pure structure - NO default data
export interface Activity {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const Activites: React.FC<ActivitiesProps> = ({ title, subtitle, activities }) => {
  return <section className="py-20 md:py-24 lg:py-32">...</section>
}
```

**Content Provider** (`src/components/{widen,pitha}/`):
```tsx
// Defines ALL content + icons, passes to template
import { Monitor, Users } from 'lucide-react';
import Activites, { Activity } from '../Activites';

const WActivities = () => {
  const activities: Activity[] = [
    { icon: <Monitor className="w-8 h-8" />, title: '...', ... }
  ];
  return <Activites title="..." activities={activities} />
}
```

### Standard Section Spacing
**Always use**: `className="py-20 md:py-24 lg:py-32"`
Container structure: `<div className="container mx-auto px-4">`

### Icons
- Use `lucide-react` for all icons, never emoji or hardcoded SVGs
- Pass icons as ReactNodes in data arrays, not as string references
- Standard icon size in cards: `className="w-8 h-8"` (buttons: `w-5 h-5`)

### Responsive Grid Patterns
Dynamic grid columns based on array length:
```tsx
const getGridCols = () => {
  if (cards.length === 1) return 'lg:grid-cols-1';
  if (cards.length === 2) return 'lg:grid-cols-2';
  if (cards.length === 3) return 'lg:grid-cols-3';
  return 'lg:grid-cols-4';
};
// Always: grid-cols-1 md:grid-cols-2
```

### Dashboard Layout
```tsx
<div className="min-h-screen bg-gray-50 py-16">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-80 flex-shrink-0"><Sidebar /></div>
      <main className="flex-1">...</main>
    </div>
  </div>
</div>
```

## Key Components

### DashboardSidebar
- Mobile: `w-full`, Desktop: `lg:w-80`
- Uses `usePathname()` for active route detection
- Props: `userName`, `userEmail`, `userStatus`, `onLogout`

### Card Components (`src/components/ui/cards/`)
- VisionCard: Quarter-circle decorations (purple-200), single icon + title + subtitle
- ContactCard: Purple background section, centered CTA with arrow icon
- All cards use `rounded-3xl` and soft shadows

### Journey/Timeline
- Vertical dotted lines between items (border-dashed)
- Lines break at circles (not continuous through them)
- Year on left, dot in middle, content on right

## Styling Conventions

### Colors
- Primary: `purple-600` (CTAs, icons)
- Accent backgrounds: `purple-50`, `purple-100`, `purple-200`
- Status badge: `bg-green-100 text-green-700`
- Logout: `bg-red-100 text-red-600`

### Typography
- Headings: `text-3xl md:text-4xl font-bold text-gray-900`
- Subtitles: `text-base md:text-lg text-gray-600`
- Body: `text-sm md:text-base text-gray-700`

### Buttons
- Primary: `px-6 md:px-8 py-3 md:py-4 bg-purple-600 text-white rounded-full`
- Secondary: `border-2 border-purple-600 text-purple-600 bg-transparent`
- Always include hover states

### Forms
- Inputs: `px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500`
- Match button `py-3` to input height for alignment
- Icons in labels: `<User className="w-4 h-4" />`

## Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   └── dashboard/         # Dashboard with nested routes
├── components/
│   ├── *.tsx              # Reusable template components (export interfaces)
│   ├── ui/                # Generic UI components (Button, Card, etc.)
│   │   └── cards/        # Specialized card components
│   ├── widen/            # WIDEN program-specific content providers
│   └── pitha/            # Pitha program-specific content providers
└── lib/
    └── data.ts           # Shared data structures
```

## Development Commands
```bash
npm run dev     # Development server (localhost:3000)
npm run build   # Production build
npm run lint    # ESLint check
```

## Common Pitfalls
1. **Never** put default data in template components - always pass via props
2. **Never** use `justify-end` when centering buttons - use `justify-center`
3. **Always** export interfaces from template components for type safety
4. **Never** use fixed grid columns - implement dynamic responsive grids
5. Motion components require `"use client"` directive
6. Sidebar must be `w-full lg:w-80` for mobile responsiveness

## Animation (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```
