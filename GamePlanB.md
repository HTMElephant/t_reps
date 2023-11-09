# GamePlan

## Requirements

tasks
set up db
set up api
set up react app
now do requirements

### Frontend Requirements

- Must have at least 2 routes
- Must use a route param

## Frontend

[x] Users should first see a login screen and should be able to login with email
[x] Users should see a list of their workouts after logging in
[x] This list should have an option to create a new workout
[x] When creating a new workout users should see a list of avaialbel excercises
[x] Users should be able to add exercises to a workout
[x] Users should be able to save a workout
[x] The Modal we made should be a re-usable component
[ ] Users can see exercises on a workout
[ ] Users can delete a workout
[ ] Users can start a workout
[ ] Once a workout has been started they can end the workout
[ ] Users should be able to access a history of their workouts that show start and end date

### Routes

[x] login (home if not logged in)
[x] workouts (home if logged in)
[ ] workout/id (active workout)
[ ] history

### BONUS

[ ] Users should be able to edit a workout
[ ] Users should be able to add exercises to the list
[ ] Should display a warning if user enters invalid credentials
[x] User should persist after refresh
[x] User should be able to logout

## Database

- `exercise` table:
  - Fields: `id`, `name`, `description`, `body part`, `weight type`
- `users` table:
  - Fields: `id`, `username`, `email`, `password`
- `workout` table:
  - Fields: `id`, `user_id`, `name`, `deleted_at`
- `workout_exercises` table:
  - Fields: `workout_id`, `exercise_id`
- `workout_history` table:
  - Fields: `workout_id`, `user_id`, `start_date`, `end_date`

## BackEnd

### Login Page

- post /login

### Workouts Page

- get /users/:id/workouts
- get /exercises
- post /workouts

### History

- post /workout_history
- put /workout_history/:id
- get /users/:id/workout_history

### Bonus

- put /workouts/:id
