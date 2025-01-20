# ReCustom

## Backend (NestJS)

### Overview

The backend is built with [NestJS](https://nestjs.com/) and provides the server-side logic and database interactions for the application.

### Features

- User management (CRUD operations)
- Activity logging
- Authentication using JWT
- Database integration using TypeORM

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd rc-custome-be
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:
   Create a `.env` file in the root directory and define the following variables:

   ```env
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

4. Run database migrations (if needed):
   ```bash
   npm run seed
   ```

### Usage

- Start the development server:

  ```bash
  npm run start:dev
  ```

- Build the project:
  ```bash
  npm run build
  ```

### Scripts

| Command         | Description                 |
| --------------- | --------------------------- |
| `npm run build` | Build the project           |
| `npm run start` | Start the app in production |

---

# frontend

## Frontend (React)

### Overview

The frontend is a React application that interacts with the backend to provide a user interface.

### Features

- User management form with MUI components
- Routing with React Router
- Charting with Recharts

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd rc-custom-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Usage

- Start the development server:

  ```bash
  npm start
  ```

- Build for production:
  ```bash
  npm run build
  ```

### Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm start`     | Start the app in development |
| `npm run build` | Build the project            |

---

### Dependencies (Backend)

- `@nestjs/common` - NestJS core module
- `@nestjs/config` - Configuration module
- `@nestjs/typeorm` - TypeORM integration
- `typeorm` - ORM for database interactions
- `pg` - PostgreSQL driver

### Dependencies (Frontend)

- `@mui/material` - Material-UI components
- `react-router-dom` - Routing library
- `recharts` - Charting library

### Video link

-> https://www.loom.com/share/d10685ed847f4b3f92b8ddf6541a735d

### Notes

Ensure that both the backend and frontend are properly configured and the environment variables are set before running the application.
