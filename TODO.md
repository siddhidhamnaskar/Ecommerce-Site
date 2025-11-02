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
