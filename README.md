# Task Manager

## Description
This is a Task Manager application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The application allows users to:

- View available projects.
- Accept projects and view accepted projects.
- Track the progress of tasks associated with accepted projects.
- Mark tasks as completed, with progress being dynamically updated.

The frontend is optimized for mobile dimensions, ensuring a user-friendly experience across devices.

---

## Features

### 1. **View Available Projects**
   - Displays all pending projects with their descriptions and associated tasks.

### 2. **Accept Projects**
   - Users can accept a project, moving it to the list of accepted projects.

### 3. **View Accepted Projects**
   - Displays all accepted projects and their associated tasks.

### 4. **Track Progress**
   - Calculates and displays overall progress based on completed tasks.

### 5. **Complete Tasks**
   - Allows users to mark individual tasks as completed, dynamically updating the progress bar.

---

## Tech Stack

### Frontend
- **React.js** for building a dynamic user interface.
- Styled with inline CSS for simplicity and responsiveness.

### Backend
- **Node.js** with **Express.js** for building the REST API.
- **MongoDB** for database management, with **Mongoose** for schema modeling.

### API Services
- Axios is used for making API calls from the frontend.

---

## Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or above)
- **MongoDB**
- **Git**

---

### Steps to Clone and Run the Application

#### 1. **Clone the Repository**
```bash
git clone https://github.com/anushkaps/task-manager.git
```

#### 2. **Navigate to the Project Directory**
```bash
cd task-manager
```

#### 3. **Install Dependencies**
- Install server dependencies:
  ```bash
  cd server
  npm install
  ```
- Install client dependencies:
  ```bash
  cd ../client
  npm install
  ```

#### 4. **Set Up Environment Variables**

Create a `.env` file in the `server` directory and add the following variables:
```env
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
```
Replace `<your_mongodb_connection_string>` with your MongoDB connection string.

---

### Running the Application

#### 1. **Start the Backend**
Navigate to the `server` directory and run:
```bash
npm start
```
The server will start at `http://localhost:5000`.

#### 2. **Start the Frontend**
Navigate to the `client` directory and run:
```bash
npm start
```
The frontend will start at `http://localhost:3000`.

---

## Folder Structure

```
root
├── client         # Frontend React application
│   ├── public     # Static assets
│   ├── src
│   │   ├── components  # React components
│   │   ├── services    # Axios service
│   │   ├── App.js      # Main app component
│   │   └── index.js    # Entry point
│   └── package.json
├── server         # Backend application
│   ├── models     # Mongoose schemas
│   ├── routes     # Express routes
│   ├── server.js  # Main server file
│   └── package.json
└── README.md      # Project documentation
```

---

## API Endpoints

### Project Endpoints
- `GET /projects`: Fetch all projects.
- `PATCH /projects/:id`: Accept a project.

### Task Endpoints
- `PATCH /tasks/:id/complete`: Mark a task as completed.

---

## Future Improvements
- Add authentication for user management.
- Include a feature to create and edit projects and tasks.
- Enhance UI with animations and transitions.

---

## License
This project is licensed under the MIT License. Feel free to contribute!

