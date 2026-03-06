# Freight Quotation MVP

This project is a Minimum Viable Product (MVP) for a Freight Quotation application. It is built using Next.js with TypeScript and React, leveraging modern frontend architecture and state management with Redux. The application provides a user interface for requesting and managing freight quotations.

## Project Structure

- **app/**  
  Contains the main application pages, API routes, and global styles. This is the entry point of the Next.js app.

- **components/**  
  React components organized by atomic design principles:  
  - *atoms*: Basic UI elements like inputs and labels  
  - *molecules*: Composite components like cards  
  - *organisms*: Larger UI sections like forms  
  - *layout*: Layout components including sidebar and main layout  
  - *providers*: Context and Redux providers  

- **styles/**  
  SCSS variables and global styles.

- **lib/**  
  Utility functions, Redux slices, hooks, services, and TypeScript types.

- **public/assets/**  
  Static assets such as favicon and logos.

- **Dockerfile** and **docker-compose.yml**  
  Configuration files for containerizing the application with Docker.

- **package.json** and **yarn.lock**  
  Project dependencies and scripts.

- **.env**  
  Environment variables configuration.

## Running the Application

### Using Docker Desktop (Recommended)

1. Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running.
2. In the project root directory, build and start the container using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. The application will be available at `http://localhost:3000`.

4. To stop the application, press `Ctrl+C` and then run:

   ```bash
   docker-compose down
   ```

### Running Locally with Yarn

1. Make sure you have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed.
2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Live Preview

[Freight Quotation MVP](https://freight-quotation-mvp-56e4.vercel.app/)

## Presentation Video

[Watch video](https://youtu.be/ZcidR9IetXk)

---

Feel free to reach out if you have any questions or need further assistance.
