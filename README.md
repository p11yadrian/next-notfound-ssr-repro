# `notFound()` in a page serves an empty error shell instead of the not-found UI

Minimal reproduction for a Next.js App Router issue.

## Structure

- `app/layout.tsx`: root layout with `<html lang="en">` and a `<header id="site-header">`
- `app/not-found.tsx`: renders `<h1 id="not-found-ui">`
- `app/[slug]/page.tsx`: calls `notFound()` for any slug except `exists`

## Steps

```bash
npm install
npm run build
npm start
```

In another terminal:

```bash
# Normal page: root layout is server-rendered
curl -s http://localhost:3000/exists | grep -oE '<html[^>]*>|id="site-header"'
# <html lang="en">
# id="site-header"

# notFound(): status 404, but the HTML is Next's error shell
curl -s -w '\n%{http_code}\n' http://localhost:3000/missing | grep -oE '<html[^>]*>|id="site-header"|id="not-found-ui"|^[0-9]{3}$'
# <html id="__next_error__">
# 404
```

The server HTML for `/missing` has no `lang`, no root layout and no not-found UI, and its `<body>` is empty. After hydration the browser renders the root layout and `app/not-found.tsx` correctly.

Same result on `next@14.2.33`, `15.5.4`, `16.2.11`, `16.3.7` and `16.5.0-canary.2`, with webpack and Turbopack.
