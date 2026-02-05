# Bells University Backend API

This is the backend API for the Bells University application, built with Node.js, Express.js, and LowDB.

## Features

-   **Staff Management:** CRUD operations for university staff (Chancellor, VC, etc.).
-   **Location Management:** CRUD operations for university landmarks with geographical coordinates.
-   **News Management:** CRUD operations for news articles.
-   **Business Affiliates:** CRUD operations for businesses within the university, including image uploads.
-   **Admin Login:** Simple passcode-based login for administrative access (passcode: `1111`).

## Setup and Running

1.  **Navigate to the backend directory:**
    ```bash
    cd bells-university-app/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create 'uploads' directory:**
    For image uploads to work, you **must** manually create an `uploads` directory inside this `backend` folder.
    ```bash
    mkdir uploads
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000` (or the `PORT` environment variable if set).

## API Endpoints

-   `GET /api/users`: Get all users (placeholder, currently empty).
-   `GET /api/businesses`: Get all business affiliates.
-   `POST /api/businesses`: Add a new business affiliate (requires `multipart/form-data` with an `image` field for file upload, and `name`, `price`, `seller` fields).
-   `PUT /api/businesses/:id`: Update a business affiliate (supports optional image upload).
-   `DELETE /api/businesses/:id`: Delete a business affiliate.
-   `GET /api/events`: Get all events.
-   `POST /api/events`: Add a new event.
-   `PUT /api/events/:id`: Update an event.
-   `DELETE /api/events/:id`: Delete an event.
-   `GET /api/staff`: Get all staff members.
-   `POST /api/staff`: Add a new staff member.
-   `PUT /api/staff/:id`: Update a staff member.
-   `DELETE /api/staff/:id`: Delete a staff member.
-   `GET /api/locations`: Get all locations.
-   `POST /api/locations`: Add a new location.
-   `PUT /api/locations/:id`: Update a location.
-   `DELETE /api/locations/:id`: Delete a location.
-   `GET /api/news`: Get all news articles.
-   `POST /api/news`: Add a new news article.
-   `PUT /api/news/:id`: Update a news article.
-   `DELETE /api/news/:id`: Delete a news article.
-   `POST /api/admin/login`: Admin login (requires `passcode: '1111'` in the request body).

## Frontend Status

Due to limitations in the current environment (inability to execute `npm create` or `mkdir` commands), the frontend development could not be initiated. A frontend project would typically be created in `bells-university-app/frontend-vite` using a tool like Vite and React.
