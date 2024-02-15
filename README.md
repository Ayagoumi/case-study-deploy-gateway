# Nerif Coding Challenge

This project is built using [Next.js](https://nextjs.org/), initiated with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

Before starting, ensure the following are installed:

- Node.js version 18.17.0 or higher
- A package manager (e.g., `npm`, `yarn`, `pnpm`, or `bun`)
- An `.env.local` file configured with:
  - `NEXT_PUBLIC_PROJECT_ID=your_project_id_here`

## Getting Started

To launch the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser to view the application.

This project leverages `next/font` for optimized loading of Inter, a custom Google Font.

## Environment Setup

For WalletConnect Cloud integration, follow these steps to configure your environment variables:

- Go to [`WalletConnect Cloud`](https://cloud.walletconnect.com/app) and sign up or log in.
- In the dashboard, click on the "Create" button.
- Enter your project details, ideally naming it after your Next.js Web3 app.
- After project creation, find your `Project ID` in the project dashboard.
- Rename the `.env.local.example` file to `.env.local`.
- Copy the `Project ID` to your `.env.local` file with:
  - `NEXT_PUBLIC_PROJECT_ID=your_project_id_here`
- Replace `your_project_id_here` with the actual `Project ID`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
