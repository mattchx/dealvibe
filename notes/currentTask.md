# Current Task: Refine Color Styles for Forms

## Current Objectives
1. Address user feedback: "The form is too busy."
2. Refine dark theme color variables in `client/src/styles/globals.css` to reduce visual clutter in forms.
3. Ensure form elements (inputs, borders, labels) have appropriate contrast without being overly prominent.

## Current Context
### Project Structure
- React + TypeScript application
- Uses shadcn/ui components extensively
- Tailwind CSS for styling
- Color variables are defined in `client/src/styles/globals.css` using HSL values.
- The `client/src/components/deals/deal-form.tsx` is a key form component.

### Relevant Files
- `client/tailwind.config.ts`: Defines Tailwind CSS configuration, including color names.
- `client/src/styles/globals.css`: Defines the actual HSL values for light and dark themes.

## Next Steps
1. Propose refined color changes to `client/src/styles/globals.css`, specifically for `--muted-foreground`, `--border`, and `--input`.
2. Apply the refined color changes to `client/src/styles/globals.css`.
3. Verify the visual appearance of forms, particularly `client/src/components/deals/deal-form.tsx`.

## References
- Related tasks in projectRoadmap.md: "Enhance UI/UX", "Overhaul color styles (lighter dark mode)"
- Technical stack details in techStack.md