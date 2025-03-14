// Import necessary modules and configurations
import db from '../config/connection.js'; // Import the database connection
import cleanDB from './cleanDB.js'; // Import function to clean up the database before seeding
import User from '../models/User.js'; // Import the User model to interact with the User collection
import Thought from '../models/Thought.js'; // Import the Thought model to interact with the Thought collection

// Define an async function to seed the database
const seedDB = async () => {
  try {
    // Establish a database connection
    await db();
    
    // Clean the database by removing any existing data
    await cleanDB();

    // Insert multiple users into the User collection
    const users = await User.insertMany([
      { username: 'john_doe', email: 'john.doe@example.com' },
      { username: 'jane_smith', email: 'jane.smith@example.com' },
      { username: 'peter_jones', email: 'peter.jones@example.com' },
      { username: 'alice_white', email: 'alice.white@example.com' },
      { username: 'bob_green', email: 'bob.green@example.com' },
    ]);

    // Insert multiple thoughts into the Thought collection, associating each thought with a user
    const thoughts = await Thought.insertMany([
      {
        thoughtText: 'Enjoying a beautiful day!',
        username: users[0].username, // Linking the thought to the first user
        reactions: [
          { reactionBody: 'Awesome!', username: users[1].username }, // Reactions to the thought
          { reactionBody: 'Cool!', username: users[2].username },
        ],
      },
      {
        thoughtText: 'Just finished reading a great book.',
        username: users[1].username,
        reactions: [
          { reactionBody: 'Which book?', username: users[0].username },
        ],
      },
      {
        thoughtText: 'Coding is fun!',
        username: users[2].username,
        reactions: [
          { reactionBody: 'Totally agree!', username: users[3].username },
          { reactionBody: 'Yes it is!', username: users[4].username },
          { reactionBody: 'I agree too!', username: users[0].username },
        ],
      },
      {
        thoughtText: 'Learning new things everyday',
        username: users[3].username,
        reactions: [
          { reactionBody: 'Keep going!', username: users[1].username },
        ],
      },
      {
        thoughtText: 'Having a great time with friends.',
        username: users[4].username,
        reactions: [
          { reactionBody: 'Sounds fun!', username: users[2].username },
        ],
      },
    ]);

    // Update each user to associate them with the corresponding thought and friends
    await User.findByIdAndUpdate(users[0]._id, { thoughts: [thoughts[0]._id], friends: [users[1]._id, users[2]._id] });
    await User.findByIdAndUpdate(users[1]._id, { thoughts: [thoughts[1]._id], friends: [users[0]._id, users[3]._id] });
    await User.findByIdAndUpdate(users[2]._id, { thoughts: [thoughts[2]._id], friends: [users[0]._id, users[4]._id] });
    await User.findByIdAndUpdate(users[3]._id, { thoughts: [thoughts[3]._id], friends: [users[1]._id] });
    await User.findByIdAndUpdate(users[4]._id, { thoughts: [thoughts[4]._id], friends: [users[2]._id] });

    // Log success message once the database seeding is complete
    console.log('Database seeded successfully! 🌱');
    
    // Exit the process with a successful status code
    process.exit(0);
  } catch (error) {
    // Log any errors that occur during the database seeding process
    console.error('Error seeding database:', error);
    
    // Exit the process with an error status code
    process.exit(1);
  }
};

// Call the seedDB function to run the seeding process
seedDB();
