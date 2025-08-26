# Project Management System

This is a web-based project management application built with Angular. It is designed to help teams organize, track, and manage their work efficiently from a centralized platform.

## Key Features

The application is being developed with a focus on providing a comprehensive and intuitive project management experience.

### Currently Implemented
*   **Central Dashboard:** A "For you" page that provides an at-a-glance view of recent projects and a tabbed interface for easy access to different views like "Your projects" and "Urgents".
*   **Project Viewing:** A dedicated page to view all projects in a grid format.
*   **Responsive Layout:** A flexible UI with a collapsible sidebar for efficient navigation and a clean header for primary actions.
*   **Modular Routing:** Each feature (Dashboard, Projects, Goals, etc.) is a self-contained lazy-loaded module, ensuring the application remains scalable and performant.

### Planned Features
*   **Project Creation & Management:** Forms and interfaces to create, edit, and delete projects.
*   **Task Tracking:** The ability to add, assign, and track the status of tasks within each project.
*   **Team Collaboration:** Features to manage project teams and user roles.
*   **Goal Setting:** A dedicated section for defining and monitoring project and team goals.
*   **Advanced Filtering:** Tools to filter projects and tasks by status, assignee, labels, and more.

## Tech Stack

*   **[Angular](https://angular.io/):** A platform for building mobile and desktop web applications.
*   **[TypeScript](https://www.typescriptlang.org/):** A strict syntactical superset of JavaScript that adds optional static typing.
*   **[RxJS](https://rxjs.dev/):** A library for reactive programming using Observables to make it easier to compose asynchronous or callback-based code.
*   **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for creating custom designs without leaving your HTML.
*   **[Font Awesome](https://fontawesome.com/):** Used for scalable vector icons throughout the application.

## Project Structure

The application follows a standard Angular CLI structure with a focus on modularity:

```
/src
|-- /app
|   |-- /features
|   |   |-- /dashboard
|   |   |-- /projects
|   |   |-- ... (other feature modules)
|   |-- /shared
|   |   |-- /components (header, sidebar, layout)
|   |   |-- /services
|   |   |-- shared.module.ts
|   |-- app-routing.module.ts
|   |-- app.module.ts
|   |-- app.component.ts
|-- /assets
|-- /environments
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

*   [Node.js and npm](https://nodejs.org/en/download/)
*   [Angular CLI](https://cli.angular.io/): `npm install -g @angular/cli`

### Installation

1.  Clone the repository to your local machine.
2.  Navigate into the project directory:
    ```bash
    cd project-management-system
    ```
3.  Install the required dependencies:
    ```bash
    npm install
    ```

### Development Server

Run the following command to start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

To create a production-ready build of the application, run:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
