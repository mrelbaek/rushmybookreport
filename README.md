# RushMyBookReport

A modern, AI-powered book report generation service built with Next.js, Tailwind CSS, and OpenAI. RushMyBookReport delivers custom book reports tailored to specific education levels and writing styles, with options for standard (24-hour) and rush (1-hour) delivery.

![RushMyBookReport Screenshot](screenshot.png)

## 🚀 Project Purpose

The purpose of this project is to:
- Provide students with fast, customizable book report drafts
- Allow realistic outputs that match student writing styles and optional intentional mistakes
- Offer urgent "panic-mode" solutions (rush orders) to match real student needs
- Create a scalable SaaS MVP leveraging AI with minimal manual intervention

## 🛠 Tech Stack

| Category | Technology |
|:---|:---|
| Frontend | Next.js 14 (App Router) |
| Backend API | Next.js API Routes |
| Styling | TailwindCSS |
| AI Integration | OpenAI GPT-4 (via official Node SDK v4) |
| Database | Supabase (orders tracking, future extensions) |
| Payment | Stripe (standard and rush order checkout) |
| Email Delivery | Resend (transactional emails) |
| Hosting | Vercel |

## 🏛 High-Level Architecture

- **Landing Page:** Server-side rendered page with a prominent order form
- **Order Form:** Client-side component that collects user input and triggers API request
- **API Layer:**
  - `/api/generate` handles incoming orders
  - `/api/create-checkout` creates Stripe checkout sessions
  - `/api/webhooks/stripe` processes webhook events
- **OpenAI Integration:**
  - GPT-4 generates book reports using carefully tuned prompts
  - Optionally matches a provided writing sample for realism
- **Payment Processing:**
  - Stripe checkout integration for secure payments
  - Different pricing for standard vs. rush delivery
- **Order Management:**
  - Orders are saved to the database with status tracking
  - Reports are delivered via email and available online

## 🏃 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key
- Stripe API keys (for payment)
- Resend API key (for email)
- Supabase account (for database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rushmybookreport.git
   cd rushmybookreport
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Update the `.env.local` file with your API keys:
   ```
   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   
   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
   
   # Resend (Email)
   RESEND_API_KEY=your_resend_api_key
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # App Config
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting Up Stripe Webhooks

1. Install the Stripe CLI from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Log in to your Stripe account:
   ```bash
   stripe login
   ```
3. Start the webhook forwarding:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret and update your `.env.local` file.

## 📊 Database Schema

The project uses Supabase for data storage. Here's the main table structure:

### Orders Table

| Column | Type | Description |
|:---|:---|:---|
| id | UUID | Primary key |
| customer_email | TEXT | Customer's email address |
| book_title | TEXT | Title of the book |
| author | TEXT | Author of the book |
| grade_level | TEXT | Education level (elementary, middle, high, college) |
| length | INTEGER | Report length in words |
| is_rush | BOOLEAN | Whether it's a rush order |
| sample_text | TEXT | Optional writing sample |
| status | TEXT | Order status (pending, processing, completed, failed) |
| stripe_session_id | TEXT | Stripe checkout session ID |
| created_at | TIMESTAMP | When the order was created |
| completed_at | TIMESTAMP | When the order was completed |
| report_text | TEXT | The generated book report |

## 🎮 Project Structure

```
rushmybookreport/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── create-checkout/  # Stripe checkout API
│   │   ├── generate/         # Report generation API
│   │   └── webhooks/         # Webhook handlers
│   ├── success/              # Checkout success page
│   ├── view-report/          # Report viewing page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── components/               # Reusable components
│   ├── BookReportForm.tsx    # Main form component
│   └── ...                   # Other components
├── lib/                      # Utility functions
│   ├── openai.ts             # OpenAI integration
│   ├── stripe.ts             # Stripe integration
│   ├── resend.ts             # Email integration
│   └── supabase.ts           # Database integration
├── public/                   # Static assets
├── .env.example              # Example environment variables
├── next.config.js            # Next.js configuration
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🌟 Future Improvements

- Admin dashboard for order management
- Customizable writing error rate for more realistic reports
- Additional homework types (essays, summaries, etc.)
- User accounts and report history
- Multilingual support
- Mobile app with notifications

## 📝 Development Approach

- **MVP-first mentality:** Focused on shipping core functionality quickly
- **Separation of concerns:** API logic separated from UI components
- **Optimized user experience:** Streamlined form for quick ordering
- **Extensible architecture:** Easy to add new features and integrations

## 🛡 Disclaimer

RushMyBookReport provides AI-generated draft materials intended for study assistance only. Users are encouraged to use the drafts responsibly and adhere to their school's academic honesty policies.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- AI powered by [OpenAI](https://openai.com/)
- Payment processing by [Stripe](https://stripe.com/)
- Email delivery by [Resend](https://resend.io/)
- Database by [Supabase](https://supabase.com/)

---

> Built with ❤️ for students who need a little last-minute help with book reports.