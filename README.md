## Summary 📑

Buzzplans is a small app for people who want to keep track of their plans. It has the following features:

- Creation, listing, updating and deletion of holiday plans
- Generation of PDFs for each of their plans

## Tech Stack 🛠️

- **Front-end:** React on Next.js 14. Tailwind is used as a styling solution
- **Back-end:** Next.js API Routes were used to handle CRUD operations.
- **Database:** No database was used in this project. However, this project persists data using the `plans.json` file contained in root.
- **Utilities:** React Hook Form along with Zod were used for form control and validation.

## How to Run It 🌐

After cloning the repository, please run `npm install && npm run build && npm run start`. It should open up the project on `http:localhost:3000`.

## Testing 🧪

Buzzplans has tests written for it using Cypress. To run them, please use `npm run test:e2e`.

## Miscellaneous 🗂️

A video demo for this project can be found [here](https://www.loom.com/share/e5d83ac976054c708b1f88117d16b768).
It is also deployed [here](https://buzzplans.vercel.app/).
