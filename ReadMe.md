# T-Reps: A Simple Workout Tracker 🦖

Welcome to t_reps, a full-stack workout tracker app that integrates React for the frontend, Express for the backend, and Massive to connect to a PostgreSQL database. This README will guide you through the setup process and provide an outline for each day of development.

---

## Part 1 - Setup

### 1. Database (DB) Setup

- **Connection String:** This will be provided at the start of the project.

- **Tables:** Here are the tables to be set up:
  - `exercise` table:
    - Fields: `id`, `name`, `description`, `body part`, `weight type`
  - `users` table:
    - Fields: `id`, `username`, `email`
  - `workout` table:
    - Fields: `id`, `user_id`, `name`
  - `workout_exercises` table:
    - Fields: `workout_id`, `exercise_id`
  - `workout_history` table:
    - Fields: `workout_id`, `user_id`, `start_date`, `end_date`

### 2. Backend Setup

- **Folder Structure:**
  - Create a main project folder.
  - Inside this folder, set up a directory for the Express API app.

- **Express App:**
  - Set up the Express app.
  - Connect to the database using Massive.
  - Create endpoints to fetch `user`, `workout`, and `workout_history`. Ensure that fetching `workout` also retrieves its exercises.

### 3. Frontend Setup

- **Folder Structure:**
  - Inside the main project folder (at the same level as the Express API directory), create a new React directory using the command: `npx create-react-app`.

- **State Management:**
  - Set up an App-level context provider.
  - Within this provider, establish a `user` state.

- **Routing and Pages:**
  - In `app.js`, if there's no user in the provider, display the login page. Otherwise, display the app's main router.
  - Create a login page:
    - This page will take a user's email.
    - Using this email, retrieve the corresponding user.
  - With the user loaded, utilize a `useEffect` in the provider to fetch the user's workouts.
  - Create a page to display all the workouts:
    - Each workout should be clickable, leading to a pop-up page.
    - This pop-up page will display all the exercises associated with the clicked workout.
  - Finally, add a 'History' tab/page that shows the user's workout history.
