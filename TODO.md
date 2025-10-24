# TODO: Add Orders Page

## Overview
The ecommerce app has order models and API routes but lacks an orders page for users to view their order history. This task involves creating an orders page that displays user's orders with details.

## Steps
- [x] Create /app/orders/page.tsx for orders page UI
- [x] Update navbar.tsx to include orders link for authenticated users
- [ ] Test orders page to ensure orders display correctly

## Notes
- Orders page should display orders in a list with order ID, date, status, total, and expandable item details
- Requires authentication to view orders
- Use existing /api/orders route to fetch orders

# TODO: Add Checkout Page

## Overview
Add a basic checkout page that displays cart items, total, shipping form, payment form (display only), and a place order button. Update cart page to link to checkout.

## Steps
- [x] Create /app/checkout/page.tsx with cart summary, shipping form, payment form, and place order button
- [x] Update /app/cart/page.tsx to link "Proceed to Checkout" button to /checkout
- [x] Update checkout page to handle POST order via /api/orders
