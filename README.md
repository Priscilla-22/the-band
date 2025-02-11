# E-Commerce Web Application

This is a full-stack e-commerce web application built with **ReactJS (TypeScript)** on the frontend and **Python Flask** on the backend. The application allows users to browse products, add them to a cart, and manage their orders. Additionally, an admin dashboard is provided for managing products, viewing analytics, and performing CRUD operations.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Project Structure](#project-structure)
4. [Setup Instructions](#setup-instructions)
5. [Running the Application](#running-the-application)
6. [API Endpoints](#api-endpoints)
7. [Version Control](#version-control)
8. [Evaluation Criteria](#evaluation-criteria)
9. [Bonus Points](#bonus-points)

---
## Admin Logins 
email : admin@theband.com
password : admin

## Features

### Frontend (ReactJS with TypeScript)
1. **Landing Page**
    - Navigation bar with company logo, menu items, and an interactive cart icon.
    - Promotional banner showcasing featured products and offers.
    - Product listing section with grid/list view and filtering/sorting options.
    - Testimonials section displaying customer reviews and ratings.
    - Footer with company information, contact details, and social media links.

2. **Product Card**
    - Interactive product view with navigation to a detailed product page.
    - Add to cart functionality with visual feedback and cart count animation.
    - Remove from cart option.

3. **Admin Authentication**
    - Secure login page with email/username and password fields.
    - Form validation and error handling.
    - Authentication state management.

4. **Admin Dashboard**
    - Analytics section with sales performance graphs and inventory status.
    - Product management with CRUD operations (Create, Read, Update, Delete).
    - Detailed product view and edit functionality.
    - Delete confirmation and new product creation form.

### Backend (Python Flask)
- RESTful API for product management.
- Mock API integration for testing (using Faker API or JSON Placeholder).
- Error handling and loading state management.
- Authentication and authorization for admin access.

---

## Technologies Used

### Frontend
- **ReactJS** with **TypeScript**
- **Material-UI** for styling and components
- **React Context API** for global state management
- **React Router** for navigation
- **Axios** for API integration
- **Chart.js** for analytics and graphs

### Backend
- **Python Flask** for RESTful API
- **SQLite** for database (or any other preferred database)
- **Flask-CORS** for handling cross-origin requests
- **Faker API** for mock data generation

---

## Project Structure



---

## Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher) installed for the frontend.
- **Python** (v3.8 or higher) installed for the backend.
- **Git** for version control.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-app.git
   cd ecommerce-app