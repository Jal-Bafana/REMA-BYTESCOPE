# Campaign Flow (Public Site)

## Objective

Simulate a believable social-engineering journey through a content platform.

## Step-by-Step Journey

1. User opens `index.html`.
2. User clicks into a full article.
3. User sees sponsored offer inside `article-secure-prompting.html`.
4. Ad click routes user to `login.html`.
5. User signs in with validated fields.
6. User is redirected to `dashboard.html`.
7. User clicks coupon CTA.
8. User reaches `malicious.html` and triggers download.

## Captured Events

The following events are recorded in localStorage:

- `Ad clicked`
- `User sign-in recorded`
- `Coupon clicked`
- `Tool package downloaded`

## Redirect Control

`script.js` enforces an allow-list for route navigation:

- `index.html`
- `login.html`
- `dashboard.html`
- `malicious.html`

Any blocked path attempt is logged as `Unsafe redirect blocked`.
