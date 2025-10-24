# TODO: Add Cart Page and Functionality

## Overview
The ecommerce app has cart models in Prisma schema but lacks API routes, cart page, navbar updates, and cart context. This task involves implementing full cart functionality.

## Steps
- [x] Create /api/cart/route.ts for POST (add item) and GET (retrieve cart)
- [x] Create /app/cart/page.tsx for cart page UI
- [x] Update navbar.tsx to include cart link with item count
- [x] Create CartContext.tsx for global cart state management
- [x] Update AddToCartButton.tsx to use cart context
- [x] Create /api/cart/[itemId]/route.ts for DELETE and PATCH operations
- [x] Update layout.tsx to include CartProvider

## Notes
- Cart is user-specific, requires authentication
- API routes need JWT verification to get user ID
- Cart page should display items with product details, quantity, total
- Navbar cart link should show item count
- Cart context to manage state across components
