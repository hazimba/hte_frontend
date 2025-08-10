This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Live Demo Link : https://hte-frontend.vercel.app/

## Setup Instruction

to run locally

HTE_backend

1. Run npm install to install dependencies.
2. Run npm run dev to start the backend server in development mode.

HTE_FRONTEND

1. Run npm install to install dependencies.
2. config/url.ts to make sure url point to local
3. Run npm run dev to start the frontend development server.

## Tech Stack Used

1. Frontend: NextJs
2. Backend: NodeJs
3. Database: PostgreSQL (neondb)
4. Search: n/a

# Thought process and design decisions

The design of application is a list of Seller to sell their preloved product,
imagine the event of carboot sales, or thrift area where people sell their preloved,
people who come at main door can have such a qr for this app (not yet implement as now the app is for seller),
then can know immediaty what selling inside, in long run this app will have image of the product,
location of the booth/ carboot, direct purchase, and bidding, other information such
next event, promotion, weather, subscription, and to be a community that every person involve
will have centralize app to manage

1. I have not implemented ElasticSearch, so I need to optimize the app for better performance
2. Backend is much easy than frontend, only couple hour to build the base in order to run frontend
3. Use of Next.js for the frontend, a monorepo structure would be ideal as it fullstack framework
4. This app may not have full CRUD for other table except products as app mainly focus on the products as below
   - this include filter from product and favorite table
   - create, edit, delete, update
5. The app now full of testing data that I made through out the process of development
6. The purchase button not work (but can work in future)

# Any known issues or limitations

1. Not much reference in youtube for ElasticSearch, need to skip this.
2. Not fully utilize Next Framework, rushing, not thinking much
3. 7 days more than enough to build something more but since got this assessment during UAT week, only start couple days ago

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
