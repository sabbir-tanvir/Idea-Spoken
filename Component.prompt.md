---
name: createTemplateComponent
description: Create reusable template components with content provider pattern and consistent styling
argument-hint: component name, design requirements, and content structure
---

Create a reusable component following the template + content provider architecture pattern.

**Component Structure:**

1. **Template Component** (in `src/components/`):
   - Pure structure component that accepts all content as props
   - Export interface for data types
   - NO default data or hardcoded content
   - Accept `title`, `subtitle`, and main content array as props
   - Use standard section padding: `py-20 md:py-24 lg:py-32`
   - Use container structure: `<div className="container mx-auto px-4">`

2. **Content Provider** (in `src/components/{program}/`):
   - Import template component and interface
   - Import icons from `lucide-react` (never use emojis or hardcoded SVGs)
   - Define all content in data arrays with icons as ReactNodes
   - Pass all props to template component
   - Standard icon size: `w-8 h-8` for cards, `w-5 h-5` for buttons

**Styling Requirements:**

- **Colors**: Use `purple-600` for primary CTAs and icons, `purple-50/100/200` for accent backgrounds
- **Typography**: 
  - Headings: `text-3xl md:text-4xl font-bold text-gray-900`
  - Subtitles: `text-base md:text-lg text-gray-600`
  - Body: `text-sm md:text-base text-gray-700`
- **Buttons**: 
  - Primary: `px-6 md:px-8 py-3 md:py-4 bg-purple-600 text-white rounded-full hover:bg-purple-700`
  - Secondary: `border-2 border-purple-600 text-purple-600 bg-transparent`
- **Cards**: Use `rounded-3xl` or `rounded-2xl` with soft shadows
- **Forms**: 
  - Inputs: `px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500`
  - Match button padding (`py-3`) to input height

**Responsive Grid Pattern:**

Implement dynamic grid columns based on content array length:
```tsx
const getGridCols = () => {
  if (items.length === 1) return 'lg:grid-cols-1';
  if (items.length === 2) return 'lg:grid-cols-2';
  if (items.length === 3) return 'lg:grid-cols-3';
  return 'lg:grid-cols-4';
};
// Base: grid-cols-1 md:grid-cols-2
```

**Mobile Responsiveness:**

- Ensure full width on mobile: `w-full lg:w-{size}`
- Use flex-col stacking: `flex-col lg:flex-row`
- Test icon sizes scale properly on small screens

**Key Rules:**

1. Always export interfaces from template components
2. Pass icons as ReactNodes, not string references
3. Use `justify-center` for centered buttons (never `justify-end`)
4. Include `"use client"` directive if using Framer Motion
5. Implement proper TypeScript types for all props

Generate both the template component and an example content provider component following these patterns.
