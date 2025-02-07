
# Angular Project

This is an Angular-based web application designed with modular components, authentication, routing, and dynamic data handling. Below is the documentation to understand the application's functionality and how to set it up.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Running the Application](#running-the-application)
- [Functionality](#functionality)
  - [Authentication](#authentication)
  - [Components](#components)
  - [Routing](#routing)
  - [Guards](#guards)
  - [Services](#services)
  - [Pipes](#pipes)
- [Folder Structure](#folder-structure)
## Overview

This project is a web application built with Angular. It includes features such as user authentication, modular components, route-based navigation, and service-based data handling. The application is structured for scalability and maintainability.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- [Angular CLI](https://angular.io/cli) (globally installed)


## Running the Application

To start the development server:

```bash
ng serve
```

The application will be accessible at [http://localhost:4200](http://localhost:4200).

## Functionality

### Authentication

- Provides secure user authentication.
- Login and registration pages implemented in `src/app/auth`.
- Uses token-based authentication managed by the `AuthService`.

### Components

- Modular, reusable components organized by feature.
- Key components include:
  - **Admin Module**:
    - Add tasks (`src/app/admin/add-task`)
    - View all tasks (`src/app/admin/all-tasks`)
    - Update tasks (`src/app/admin/update-the-task`)
  - **User Module**:
    - View tasks (`src/app/user/all-tasks`)
  - **Auth Module**:
    - Login (`src/app/auth/login`)
    - Register (`src/app/auth/register`)
  - **Shared Components**:
    - Header (`src/app/header`)
    - Not Found Page (`src/app/not-found-page`)

### Routing

- Configured in `src/app/app.routes.ts`.
- Key routes include:
  - `/login`: User login page.
  - `/register`: User registration page.
  - `/admin`: Admin dashboard with sub-routes for task management.
  - `/user`: User dashboard with sub-routes for viewing tasks.
  - `/not-found`: Page not found.

### Guards

- **AuthGuard**:
  - Defined in `src/guards/auth-guard.service.ts`.
  - Protects routes to ensure only authenticated users can access certain pages.

### Services

- **AuthService**:

  - Manages user authentication and token storage.
  - Located in `src/services/auth-service.service.ts`.

- **TaskService**:

  - Handles CRUD operations for tasks.
  - Located in `src/services/task-service.service.ts`.

### Pipes

- Custom pipes for data transformation:
  - **StatusPipe**: Formats task status (`src/pipes/status.pipe.ts`).
  - **UserNamePipe**: Formats and displays user names (`src/pipes/user-name-pipe.pipe.ts`).

## Folder Structure

- **src/**: Contains the source code of the application.
  - **app/**: Main application components and modules.
    - **auth/**: Authentication module.
    - **admin/**: Admin features.
    - **user/**: User features.
    - **header/**: Shared header component.
    - **not-found-page/**: Page not found component.
  - **assets/**: Static files such as images, styles, and fonts.
  - **guards/**: Route guards.
  - **pipes/**: Custom Angular pipes.
  - **services/**: Services for API communication and business logic.
  - **environments/**: Environment-specific configurations.