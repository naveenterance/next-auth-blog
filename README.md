This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Next.js Blog with MongoDB Backend and Authentication

This project is a blog built using Next.js with MongoDB as the backend database and authentication provided by Next.js's backend capabilities. It also supports image uploads with images stored in the public folder.
Features

    Next.js for server-side rendering and client-side routing.
    MongoDB for data storage.
    Authentication powered by Next.js backend capabilities.
    CRUD operations for blog posts.
    Responsive design for mobile and desktop.
    Image uploads with images stored in the public folder.

Getting Started
Prerequisites

    Node.js installed on your machine.
    MongoDB installed and running locally or accessible remotely.

Installation

    Clone the repository:

bash

git clone https://github.com/naveenterance/next-auth-blog.git

    Navigate into the project directory:

bash

cd next-auth-blog

    Install dependencies:

bash

npm install

    Create a .env.local file in the root directory and add the following environment variables:

makefile

MONGODB_URI=<your MongoDB URI>
SECRET=<your secret key for session encryption>

Development

Start the development server:

bash

npm run dev

Open http://localhost:3000 to view it in your browser.
Deployment

This project is deployed at next-auth-blog-sigma.vercel.app.

This project can be easily deployed to Vercel or any other hosting service compatible with Next.js projects. Make sure to set up environment variables in your deployment environment similar to the .env.local file.
Usage

    Register a new user or login with existing credentials.
    Once logged in, you can create, edit, and delete blog posts. You can also upload images for your blog posts, which will be stored in the public/images folder.
    Logout when finished.

Contributing

Contributions are welcome! Feel free to open issues or pull requests.
License

This project is licensed under the MIT License - see the LICENSE file for details.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
