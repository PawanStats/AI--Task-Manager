# AI Task Manager - Frontend

React-based frontend for the AI Task Manager application.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as completed/incomplete
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Search tasks
- ✅ Get AI-generated task suggestions
- ✅ Clean and responsive UI using Bootstrap

## Tech Stack

- React 18
- Bootstrap 5
- React Icons
- React Toastify
- Fetch API for HTTP requests

## Steps to Run Frontend

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

**Note:** Make sure the backend server is running on `http://localhost:8082` before starting the frontend.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Configuration

To change the backend API URL, edit the `API_URL` constant in `src/utils.js`:

```javascript
export const API_URL = 'http://localhost:8082';
```
