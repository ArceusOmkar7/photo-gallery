# Project: Photo Gallery

## Overview
This project is a web application for uploading, managing, and displaying image files in a gallery format. Built with **Next.js**, it leverages modern web development tools like **TypeScript**, **Radix UI**, and **Tailwind CSS**. The application includes functionality for uploading files, creating thumbnails, and displaying them in a grid layout.

## Features
- **File Uploads:** Users can upload image files.
- **Thumbnails:** Automatically generates and displays thumbnails for uploaded files.
- **Gallery View:** Displays images in a grid layout.
- **Error Handling:** Provides user-friendly error messages.
- **Responsive Design:** Built with Tailwind CSS for mobile-first responsiveness.

## Getting Started

### Prerequisites
- **Node.js**
- **npm** or **yarn** package manager
- **MongoDB** for storing file metadata

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd photo-gallery
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the MongoDB connection string:
   Create a `.env` file in the project root and add the following line:
   ```env
   DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbName>?retryWrites=true&w=majority
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Scripts
- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm start`: Serve the production build

## API Endpoints

### `/api/gallery`
- **Method:** `GET`
- **Description:** Fetches metadata for uploaded files to display in the gallery.

### `/api/upload`
- **Method:** `POST`
- **Description:** Handles file uploads and generates thumbnails.

## Technologies Used
- **Next.js:** Framework for server-side rendering and React-based development.
- **TypeScript:** Type-safe JavaScript for reliable code.
- **Radix UI:** Accessible UI components.
- **Tailwind CSS:** Utility-first CSS framework for responsive design.

## License
This project is licensed under the [MIT License](LICENSE).

