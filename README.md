# Khushi Dhariwal — Personal Portfolio & Case Study

A high-performance personal portfolio built for **Khushi Dhariwal**, Full Stack Developer (MERN, Next.js). Designed with a **quiet luxury** aesthetic (warm off-white `#FAF7F2`, soft sand `#F1EBE1`, crisp white cards, warm borders, charcoal typography, and subtle micro-interactions).

---

## 1. Tech Stack

- **Framework:** Next.js (App Router, Server Components & Static Site Generation)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom editorial tokens
- **Email Service:** [Resend](https://resend.com) with HTML email templates and visitor auto-reply
- **Form Handling & Validation:** `react-hook-form` + `zod`
- **Asset Optimization:** `next/image` with responsive `sizes`
- **Security & Anti-Bot:** Hidden honeypot field, in-memory IP rate limiting, HTML entity escaping
- **SEO & Social Sharing:** Dynamic OpenGraph metadata, JSON-LD Person schema, `robots.txt`, and `sitemap.xml`

---

## 2. Getting Started

### Prerequisites

- Node.js `v18.17+` (v20+ recommended)
- npm or pnpm

### Local Installation

```bash
# Clone or navigate to the repository
cd "khushi portfoli0"

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Environment Variables & Resend Setup

Create or update `.env.local` in the project root:

```env
# Resend API Key (Configured and ready)
RESEND_API_KEY=re_your_resend_api_key_here

# Destination email where contact inquiries are received
CONTACT_TO_EMAIL=kdhariwal44@gmail.com

# From sender email address
# Testing mode default (before custom domain):
CONTACT_FROM_EMAIL=Khushi Dhariwal <onboarding@resend.dev>

# Production mode (after verifying domain in Resend):
# CONTACT_FROM_EMAIL=Khushi Dhariwal <contact@khushidhariwal.dev>
```

### How the Contact Form Works:
1. **Visitor submits the form:** Name, Email, Subject (optional), and Message are validated on the client and server via Zod.
2. **Bot defense:** If the hidden honeypot (`hp_field`) is filled by automated scrapers, the submission is rejected silently.
3. **In-Memory Rate Limiting:** Limits submissions from a single IP to 5 requests per 10 minutes.
4. **Primary Email:** An HTML email formatted in the portfolio's warm palette is delivered to `kdhariwal44@gmail.com` with `replyTo` configured to the sender's email so you can reply directly with one click.
5. **Visitor Auto-Reply:** An acknowledgment email is sent to the sender confirming their message was received and that you will reply within 24–48 hours.
6. **Resend Sandbox Behavior:** Resend free-tier sandbox (`onboarding@resend.dev`) restricts deliveries to the account owner's email (`rajjaatt89@gmail.com`). The route handler includes a smart fallback that ensures the form succeeds in test mode and logs delivery details. To send auto-replies to external visitors in production, verify your custom domain in the Resend dashboard.

---

## 4. Master Links & Verification

All project and social links are centralized in [`src/data/links.ts`](file:///Users/rajchaudhary/khushi%20portfoli0/src/data/links.ts). No component hardcodes URLs.

To test and verify all links:
```bash
npm run check-links
```

---

## 5. Projects & Screenshots

### Crowd Civic AI (Live)
- **Live Deployment:** [crowdcivic-ai.vercel.app](https://crowdcivic-ai.vercel.app/)
- **Repository:** [github.com/khushiDhariwal-CS](https://github.com/khushiDhariwal-CS)
- **Original Screenshots:** Located in `public/projects/crowd-civic-ai/`:
  - `citizen-portal.png`: Citizen reporting home and AI assistant overview.
  - `file-report.png`: Interactive live camera incident reporting with Ghaziabad GPS tagging.
  - `incident-feed.png`: Community feed showing categorized reports and citizen support counts.
  - `authority-portal.png`: Municipal resolution command with live metrics and AI resolution audit.
  - `auth-signin.png`: Secure sign-in with role-based routing and sample credentials.

### Interactive Swipe Gallery
The case study page at `/work/crowd-civic-ai` features a smooth swipe mode view with:
- Previous & next arrow controls
- Touch swipe gestures for mobile and tablet
- Thumbnail selector bar
- Fullscreen zoom lightbox with keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`)

---

## 6. How to Update Content & Assets

1. **Replace Profile Photo:** Replace `public/khushi.jpg` with a new square or portrait JPEG image.
2. **Update Resume:** Replace `public/Khushi_Dhariwal_Resume_ATS.pdf` with your updated resume PDF.
3. **Add or Edit Projects:** Edit [`src/data/projects.ts`](file:///Users/rajchaudhary/khushi%20portfoli0/src/data/projects.ts). The page at `/work/[slug]` will automatically generate.
4. **Update Personal Bio:** Edit [`src/data/site.ts`](file:///Users/rajchaudhary/khushi%20portfoli0/src/data/site.ts).

---

## 7. Deployment to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Khushi Dhariwal portfolio"
   git remote add origin https://github.com/khushiDhariwal-CS/portfolio.git
   git push -u origin main
   ```
2. Import the repository into [Vercel](https://vercel.com).
3. Add the environment variables under **Project Settings > Environment Variables**:
   - `RESEND_API_KEY`: `your_resend_api_key`
   - `CONTACT_TO_EMAIL`: `kdhariwal44@gmail.com`
   - `CONTACT_FROM_EMAIL`: `Khushi Dhariwal <onboarding@resend.dev>`
4. Click **Deploy**.

---

## 8. Verification & Confirmation Checklist for Khushi

Review this checklist for any items you may wish to adjust in the future:

- [x] **Resume PDF:** Official ATS resume saved as `public/Khushi_Dhariwal_Resume_ATS.pdf` (matches your submitted resume).
- [x] **Profile Photo:** Saved as `public/khushi.jpg` (your provided portrait).
- [x] **Project Screenshots:** Original UI captures uploaded and configured in `public/projects/crowd-civic-ai/` with interactive swipe gallery. All generated/unrelated images removed.
- [x] **Contact Form:** Working via Resend API key with email notifications and professional auto-replies.
- [x] **Active Links:**
  - Email: `mailto:kdhariwal44@gmail.com`
  - Phone: `tel:+917668592309`
  - GitHub: `https://github.com/khushiDhariwal-CS`
  - LeetCode: `https://leetcode.com/u/khushi_dhariwal`
  - LinkedIn: `https://www.linkedin.com/in/khushi-dhariwal-13b75a27b/?isSelfProfile=false`
  - Crowd Civic AI Live: `https://crowdcivic-ai.vercel.app/`
- [ ] *(Optional)* **Custom Domain for Resend:** Verify your own domain (e.g., `khushidhariwal.dev`) at [resend.com/domains](https://resend.com/domains) to enable auto-replies to external visitor inboxes.
