# Website Name: Readora - Book Sell Platform

**Readora** is an e-commerce platform designed for book lovers to explore, purchase, and review books effortlessly. It provides a seamless user experience with a user-friendly interface and essential features for online book sales.

## Credential

**User Email and Password**

- **Email:** user1122@gmail.com
- **Password:** aaaaaa

## Live Site URL

Visit the live site at [Readora Live](https://www.readora.shop)

## Features and Characteristics

- **Book Categories:**
  Browse books by genres like fiction, non-fiction, academic, and more.

- **Advanced Search and Filters:**
  Filter books by price, author, genre, and ratings.

- **User Experience:**
  Real-time availability, detailed event categories and filters, social sharing, and multi-language support.

- **User Dashboard:**
  Manage profiles, track orders, and view purchase history.

- **Admin Dashboard:**
  Manage books, monitor sales, and track customer activities.
- **Book Reviews and Ratings:**
  Users can leave feedback and rate books to help other buyers.

- **Responsive Design:**
  Fully responsive and mobile-friendly interface.

- **Payment Integration:**
  Secure payment options including Stripe and PayPal.

- **Wishlist Functionality:**
  Save favorite books for future purchases.
- **Real-Time Stock Updates:**
  Check stock availability instantly during checkout.

- **Book Recommendations:**
  Personalized recommendations based on user interests.

## Website Sections

- **Homepage:**
  Featured books, new arrivals, and top-rated selections.

- **Category Page:**
  Explore books by genre or topic.

- **Book Detail Page:**
  Detailed information about the book, author, reviews, and price.

- **Checkout Page:**
  Event and user management, sales monitoring, and detailed platform analytics.

- **Payment and Checkout:**
  Secure and user-friendly payment process.

- **Admin Panel:**
  Add, edit, and manage book listings, sales reports, and user management.

## Used Technology and Framework

- HTML
- CSS
- Tailwind CSS
- JavaScript
- ReactJS
- NextJS
- NextAuth
- NodeJS
- ExpressJS
- MongoDB
- Mongoose

## How to Start This Application

1. **Clone the Repositories:**

   ```sh
   # Client Side:
   git clone https://github.com/DeveloperImran1/BookVila-Client.git
   cd BookVila-Client

   # Server Side:
   git clone https://github.com/DeveloperImran1/BookVila-Server.git
   cd BookVila-Server
   ```

2. **Install Dependencies:**

   ```sh
   npm install
   ```

3. **Start the Development Server:**

   ```sh
   nodemon index.js
   ```

4. **Build for Production:**

   ```sh
   npm run build
   ```

5. **Deploy to vercel:**
   ```sh
   vercel website to build and deploy
   ```

## Server Side Github Link

[Server Code](https://github.com/DeveloperImran1/BookVila-Server)

## Dependencies

- **Frontend:**

  - NextJS: A React Framework for building user interfaces.
  - Axios: Promise-based HTTP client for the browser and Node.js.
  - React Query: Hooks for fetching, caching, and updating asynchronous data in React.
  - SweetAlert2: Beautiful, responsive, customizable replacement for JavaScript's popup boxes.
  - React-Hot-Toast: Beautiful, responsive, customizable replacement for JavaScript's notification/alert.
  - Tailwind CSS: A utility-first CSS framework for rapid UI development.
  - Headless UI: Unstyled, fully accessible UI components for React.

- **Backend:**
  - Express: Fast, unopinionated, minimalist web framework for Node.js.
  - MongoDB: NoSQL database for storing application data.
  - Mongoose: Elegant MongoDB object modeling for Node.js.
  - Cors: Middleware for enabling Cross-Origin Resource Sharing.
  - Dotenv: Module to load environment variables from a `.env` file.

## Additional Information

- Secure authentication using Google and Facebook providers, along with Mailgun for email notifications.
- **Environment Variables:**

  - Create a `.env.local` file in the root of your client project and add the following variables:

    ```plaintext
    NEXT_PUBLIC_MONGODB_URI=<Your MongoDB URI>
    NEXT_PUBLIC_GOOGLE_CLIENT_ID=<Your Google Client ID>
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=<Your Google Client Secret>
    NEXT_PUBLIC_FACEBOOK_CLIENT_ID=<Your Facebook Client ID>
    NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET=<Your Facebook Client Secret>
    NEXT_PUBLIC_MAILGUN_API_KEY=<Your Mailgun API Key>
    NEXT_PUBLIC_MAILGUN_DOMAIN=<Your Mailgun Domain>
    NEXT_PUBLIC_AUTH_SECRET=<Your Auth Secret>
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<Your Stripe Publishable Key>

    ```

- **Folder Structure:**
  - `client/`: Contains the React frontend code.
  - `server/`: Contains the Express backend code.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.
