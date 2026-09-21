NORTHSTAR OUTFITTERS — FULL GA4 / GTM DEMO SITE

This is a fully functional static ecommerce demo site built for analytics implementation and QA.

CORE PAGES
- index.html — homepage
- shop.html — shop and category filtering
- product-trail-pack.html — product detail page
- cart.html — working persistent cart using localStorage
- checkout.html — validated shipping + payment form
- thank-you.html — purchase confirmation
- contact.html — contact / lead form
- about.html
- privacy.html

FUNCTIONALITY
- Persistent cart using localStorage
- Add/remove/update quantities
- Category filtering
- Product detail quantity + variant selection
- Checkout validation
- Shipping method selection
- Demo purchase / order ID generation
- Contact form
- Newsletter signup
- Responsive navigation and dropdown menu

ANALYTICS EVENTS INCLUDED
- logo_click
- nav_click
- nav_cart_click
- menu_category_click
- hero_shop_click
- hero_story_click
- category_card_click
- featured_product_click
- view_item_list
- select_item
- view_item
- select_item_variant
- add_to_cart
- remove_from_cart
- update_cart_quantity
- view_cart
- begin_checkout_click
- begin_checkout
- add_shipping_info
- add_payment_info
- purchase
- generate_lead
- form_submit
- return_home_click

GA4 / GTM SETUP
Open any HTML file and locate the "ANALYTICS PLACEHOLDER" comment in the <head>.
Either:
1) Paste your GTM container code, or
2) Enable the included GA4 gtag template and replace G-XXXXXXXXXX.

RUN LOCALLY
Best option:
1. Open Command Prompt / Terminal inside this folder.
2. Run:
   python -m http.server 8000
3. Open:
   http://localhost:8000

Do not use real payment information. This site does not process or transmit payment data.

TESTING
Recommended tools:
- Google Tag Assistant
- GA4 DebugView
- Chrome DevTools Network tab
- Chrome DevTools Console
- GTM Preview mode
