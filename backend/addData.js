require('dotenv').config();

const mongoose = require('mongoose');
const Project = require('./models/Project');  // Import your Project model
const Task = require('./models/Task');        // Import your Task model

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Failed to connect to MongoDB Atlas', err));

// Create a function to insert tasks with the projectId reference
const createTasks = async (taskDescriptions, projectId) => {
  const tasks = [];
  for (let description of taskDescriptions) {
    const task = new Task({
      description,
      is_completed: false,
      score: Math.floor(Math.random() * 100),  // Random score between 0 and 100
      projectId: projectId,  // Associate task with the project
    });
    await task.save();
    tasks.push(task._id);  // Save the Task ObjectId
  }
  return tasks;
};

// Create a function to insert projects with tasks
const createProjects = async () => {
  // Project 1: Frontend Development Project
  const project1 = new Project({
    title: 'Frontend Development',
    description: 'Develop a website using HTML, CSS, and JavaScript.',
    status: 'available',
  });
  await project1.save();

  const project1Tasks = await createTasks([
    'Set up project directory and initialize repository',
    'Create basic HTML structure for the homepage',
    'Write CSS for the homepage layout',
    'Implement JavaScript functionality for navigation menu',
    'Ensure website is responsive for mobile devices',
  ], project1._id);
  project1.tasks = project1Tasks;
  await project1.save();  // Update project with task references

  // Project 2: Coffee Making
  const project2 = new Project({
    title: 'Making Coffee',
    description: 'Follow the steps to make a perfect cup of coffee.',
    status: 'available',
  });
  await project2.save();

  const project2Tasks = await createTasks([
    'Boil water',
    'Grind coffee beans',
    'Place ground coffee in the filter',
    'Pour hot water over the coffee grounds',
    'Wait for the coffee to drip',
    'Serve the coffee in a cup',
  ], project2._id);
  project2.tasks = project2Tasks;
  await project2.save();  // Update project with task references

  // Project 3: Grocery Shopping
  const project3 = new Project({
    title: 'Grocery Shopping',
    description: 'Complete grocery shopping list and purchase items.',
    status: 'available',
  });
  await project3.save();

  const project3Tasks = await createTasks([
    'Create a shopping list',
    'Check the pantry for needed items',
    'Go to the grocery store',
    'Buy vegetables, fruits, and dairy products',
    'Pick up snacks and beverages',
    'Pay at the checkout counter',
    'Bring groceries back home and organize',
  ], project3._id);
  project3.tasks = project3Tasks;
  await project3.save();  // Update project with task references

  // Project 4: Morning Routine
  const project4 = new Project({
    title: 'Morning Routine',
    description: 'Follow a productive morning routine to start the day right.',
    status: 'available',
  });
  await project4.save();

  const project4Tasks = await createTasks([
    'Wake up early (before 7:00 AM)',
    'Drink a glass of water',
    'Exercise for 20 minutes',
    'Take a shower',
    'Have breakfast',
    'Review the daily plan and to-do list',
  ], project4._id);
  project4.tasks = project4Tasks;
  await project4.save();  // Update project with task references

  // Project 5: Freelance Work
  const project5 = new Project({
    title: 'Freelance Work',
    description: 'Complete tasks for a freelance client.',
    status: 'available',
  });
  await project5.save();

  const project5Tasks = await createTasks([
    'Review client requirements and project scope',
    'Set up a workspace for the project',
    'Design the initial layout of the website',
    'Write code for homepage',
    'Test website for responsiveness',
    'Deploy the project to production',
    'Submit the project and invoice the client',
  ], project5._id);
  project5.tasks = project5Tasks;
  await project5.save();  // Update project with task references

  console.log('Projects and tasks created successfully!');
};

// Execute the function to insert the data
createProjects().catch((err) => console.log('Error creating projects and tasks:', err));
