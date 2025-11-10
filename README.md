# UserDashboardApp: Angular Signals & Standalone Components Showcase

This project, generated with Angular CLI, serves as a modern front-end application focused on managing user data. It utilizes cutting-edge Angular features, including Signals for state management and an optimal component communication pattern.

## 🌟 Key Features

The application currently supports the following primary features, built with performance and modern development principles in mind:

### User Edit Page (`UserEditComponent`)

* **Reactive Forms:** Provides a robust form structure for editing user details (Name, Email, Phone, Website).

* **Route Parameter Data Fetching:** Uses the `ActivatedRoute` and the `toSignal` utility to reactively fetch user data based on the route ID.

* **Signals for State:** Form initialization and header updates are managed using Angular `effect`s, ensuring data synchronization when the `user` signal resolves.

### Alert Communication (`AlertComponent`)

* **Component Communication:** Demonstrates best practices for Parent-Child interaction using **`input`** (to pass `message` and `status`) and **`output`** (to handle the user dismissing the alert).

* **Conditional Navigation:** After a successful save, the application displays a success alert, and navigation to the user detail page is triggered only when the user explicitly dismisses the alert.

## 🛠️ Technology Stack

* **Framework:** Angular 20.3.9+

* **State Management:** Angular Signals (`signal`, `computed`, `effect`)

* **Architecture:** Standalone Components and Services

* **Styling:** Component-scoped CSS

## 🚀 Getting Started

This project requires **Node.js** and the **Angular CLI** to be installed globally.

### Prerequisites

To ensure you can run the project, the Angular CLI should be installed.

```bash
# Ensure Angular CLI is installed globally
npm install -g @angular/cli
```

### Installation

1. **Clone the repository:**
    ```bash
    git clone [Your Repository URL]
    cd UserDashboard
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

### Development Server

To start a local development server, run the following command:

```bash
ng serve
```

Once the server is running, open your browser and navigate to **`http://localhost:4200/`**. The application will automatically reload whenever you modify any of the source files.