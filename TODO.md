# TODO

## Replace browser alerts with shadcn/ui alerts

### Files to update:
- [x] src/components/addToCart.tsx: Replace `alert("Added to cart!");` and `alert("Failed to add to cart");` with shadcn/ui Alert components.
- [x] src/app/checkout/page.tsx: Replace multiple `alert()` calls with shadcn/ui Alert components for validation and success/error messages.

### Steps:
1. Import Alert components in each file.
2. Add state for managing alert visibility and messages.
3. Replace alert() calls with state updates to show alerts.
4. Render Alert components conditionally based on state.
5. Use appropriate variants (e.g., destructive for errors, default for success).

### Notes:
- Use AlertTitle and AlertDescription for structured messages.
- Consider using icons from lucide-react for better UX (e.g., CheckCircle for success, XCircle for errors).
- Ensure alerts are dismissible or auto-hide after a timeout.

## Change products page layout: Move filters to left side and products to right side

### Files to update:
- [x] src/app/products/page.tsx: Modify JSX to use a two-column layout with ProductFilters on the left and product grid/pagination on the right.

### Steps:
1. Wrap the content below CategoryCarousel in a flex container (e.g., div with flex classes).
2. Place ProductFilters in the left column (e.g., w-1/4 or similar for width).
3. Place the product grid and Pagination in the right column (e.g., w-3/4).
4. Ensure CategoryCarousel spans the full width at the top.
5. Add responsive classes to stack columns vertically on smaller screens (e.g., flex-col on md and below).
6. Test the layout for responsiveness and proper display.
