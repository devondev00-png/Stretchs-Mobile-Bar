# Stretchs Mobile Bar — Website App (Next.js + Prisma + Cloudinary + Stripe)

## What you get
- Marketing website: Home, Packages, Package detail, Gallery, FAQ, Contact/Enquiry
- Booking request form -> stored in DB + emailed via Resend
- Optional Stripe deposits per package (depositCents)
- Cloudinary-ready for images (admin upload endpoints can be added next)

## Environment Configuration & Security

### 1. Setup
- Copy `.env.local.example` to `.env.local` for local development.
- For production (Vercel), add these variables in Project Settings.

### 2. Sources
- **DB**: Supabase (Transaction Pooler URL)
- **Auth**: `openssl rand -base64 32` for `NEXTAUTH_SECRET`
- **Stripe**: Dashboard > Developers > API Keys (Live) & Webhooks
- **Cloudinary**: Dashboard > Programmable Media > Dashboard
- **Google**: Cloud Console > credentials > OAuth Client ID
- **Resend**: API Keys

### 3. Security Checks
- **Never commit .env files**. `gitignore` is configured.
- **Client-Side Exposure**: Only variables starting with `NEXT_PUBLIC_` are exposed to the browser. All others are server-only.
- **Admin Access**: Always set `ADMIN_ALLOWLIST_EMAILS` in production to restrict access to your specific email address.

### 4. Key Rotation Instructions
If a key is leaked (e.g. committed to GitHub):
1. **Revoke**: Go to the provider (Stripe, Resend, etc.) and roll/revoke the key immediately.
2. **Update**: Update `.env.local` and Vercel Environment Variables with the new key.
3. **Redeploy**: `npm run build` or generic Vercel redeploy to bake in the new `NEXT_PUBLIC_` keys.
4. **Invalidate Sessions**: If `NEXTAUTH_SECRET` is rotated, all users will be logged out.

---

## Quick start
1) Install deps
```bash
npm i
```

2) Configure Env
Copy `.env.local.example` to `.env.local` and fill in credentials.

3) Prisma
```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
```

4) Run
```bash
npm run dev
```

## Next steps (admin)
This scaffold includes DB + public site + inquiry pipeline. Add `/admin` with NextAuth + server actions for:
- Packages CRUD
- Gallery upload to Cloudinary
- Inquiry status updates

If you want, tell me your preferred admin login (Google or email/password) and I’ll generate the full admin UI too.


## Admin authentication (Google + Email/Password)
This project supports **both**:
- Google Sign-In (NextAuth)
- Credentials login (one admin email + bcrypt password hash)

### 1) Google Sign-In
Create OAuth credentials in Google Cloud Console and set:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### 2) Email + Password (Credentials)
Set:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`

To generate a bcrypt hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('YOUR_PASSWORD', 10))"
```

### Allowlist (recommended)
Restrict admin access:
`ADMIN_ALLOWLIST_EMAILS="you@gmail.com,you@domain.com"`


## Stripe Webhooks (record deposits in DB)
This repo includes a webhook endpoint:
- `POST /api/stripe/webhook`

1) In Stripe Dashboard → Developers → Webhooks, add endpoint:
- `https://YOUR_DOMAIN/api/stripe/webhook`
2) Subscribe to event:
- `checkout.session.completed`
3) Copy signing secret to `.env`:
- `STRIPE_WEBHOOK_SECRET`

Payments will be recorded in the `Payment` table.


## Production checklist (expert)
- Set `NEXT_PUBLIC_SITE_URL` to your production URL.
- Set `NEXTAUTH_SECRET` (long random).
- Set `ADMIN_ALLOWLIST_EMAILS` to lock down admin access.
- Configure Google OAuth redirect URI: `/api/auth/callback/google`.
- Configure Cloudinary env vars for uploads.
- Configure Resend for inquiry emails.
- Configure Stripe checkout + webhook signing secret.
- Run Prisma migrations in production.

### Production migrations
```bash
npm run prisma:migrate:deploy
```


## Luxury pack additions
### Drag & drop reorder
Admin → Reorder lets you drag & drop:
- Packages order
- Gallery order (latest 80)

### Optional hCaptcha (anti-spam)
Set these env vars:
- `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
- `HCAPTCHA_SECRET`

If `HCAPTCHA_SECRET` is set, the server will enforce captcha on inquiry submissions.
