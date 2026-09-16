# ElectroHub Frontend

ElectroHub is a full-stack e-commerce application for browsing and purchasing electronic products. This repository contains the **React frontend**, which provides the user interface for product discovery, shopping cart management, authentication, checkout, and interaction with the ElectroHub backend API.

The application is designed to provide a simple and responsive shopping experience across different categories of electronic products.

## Features

- Browse electronic products and product categories
- View detailed product information
- Search and filter products
- Add and remove products from the shopping cart
- Manage cart quantities
- User registration and login interfaces
- Checkout workflow
- Product reviews and feedback interfaces
- Responsive navigation and reusable UI components
- Integration with the Flask backend API

## Tech Stack

### Frontend

- React
- JavaScript
- HTML5
- CSS3
- Bootstrap
- Create React App

### Backend Integration

The frontend communicates with a separate Python/Flask backend using API requests.

Backend repository:

[ElectroHub Backend](https://github.com/OsirOsir/electrohub_backend)

## Project Structure

```text
src/
├── components/       # Reusable UI components
├── pages/            # Application pages
├── styles/           # Component and page styles
├── utils/            # Helper functions and utilities
├── App.js            # Main application component
├── index.js          # Application entry point
├── index.css         # Global styles
└── setupTests.js     # Testing configuration
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/OsirOsir/electrohub-frontend.git
cd electrohub-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The application will normally be available at:

```text
http://localhost:3000
```

## Backend Setup

The ElectroHub backend should also be running for functionality that depends on API data.

Clone the backend repository:

```bash
git clone https://github.com/OsirOsir/electrohub_backend.git
```

Follow the setup instructions provided in the backend repository:

[ElectroHub Backend](https://github.com/OsirOsir/electrohub_backend)

## Available Scripts

### Start development server

```bash
npm start
```

Runs the application in development mode.

### Run tests

```bash
npm test
```

Runs the available frontend tests.

### Create a production build

```bash
npm run build
```

Creates an optimized production build in the `build` directory.

## Application Functionality

### Product Browsing

Users can browse available electronics and view individual product information.

### Search and Filtering

The interface allows users to locate products through search and filtering functionality.

### Shopping Cart

Users can add products to their cart, adjust quantities, and remove products before proceeding to checkout.

### Authentication

The frontend provides interfaces for account registration, login, logout, and authenticated user interactions.

### Checkout

Users can review selected products and proceed through the application's checkout workflow.

## Project Goals

ElectroHub was developed to demonstrate the implementation of a full-stack e-commerce system using a React frontend and Flask backend.

The frontend demonstrates experience with:

- React component development
- Client-side application architecture
- API integration
- State and user-interface management
- Responsive web development
- E-commerce user workflows
- Frontend/backend integration
- Git and GitHub version control

## Backend Repository

The server-side application is available here:

[ElectroHub Backend](https://github.com/OsirOsir/electrohub_backend)

## Contributing

Contributions and improvements are welcome.

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Commit your changes:

```bash
git commit -m "Add new feature"
```

4. Push your branch:

```bash
git push origin feature/your-feature
```

5. Open a pull request.

## License

This project is intended for educational and portfolio purposes.
