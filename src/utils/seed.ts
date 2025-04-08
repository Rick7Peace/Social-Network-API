// Import necessary modules and configurations
import db from "../config/connection.js"; // Import the database connection
import cleanDB from "./cleanDB.js"; // Import function to clean up the database before seeding
import User from "../models/User.js"; // Import the User model to interact with the User collection
import Thought from "../models/Thought.js"; // Import the Thought model to interact with the Thought collection

// Define an async function to seed the database
const seedDB = async () => {
try {
    // Establish a database connection
await db();

    // Clean the database by removing any existing data
await cleanDB();

    // Insert multiple users into the User collection
const users = await User.insertMany([
    { username: "max_bright", email: "max.bright@example.com" },
    { username: "lucy_blue", email: "lucy.blue@example.com" },
    { username: "sam_red", email: "sam.red@example.com" },
    { username: "emily_sky", email: "emily.sky@example.com" },
    { username: "leo_brown", email: "leo.brown@example.com" },
]);

    // Insert multiple thoughts into the Thought collection, associating each thought with a user
const thoughts = await Thought.insertMany([
  {
    thoughtText: "Enjoying a beautiful day!",
        username: users[0].username, // Linking the thought to the first user
    reactions: [
        { reactionBody: "Totally agree!", username: users[1].username },
        { reactionBody: "Where to next?", username: users[2].username },
        ],
      },
      {
    thoughtText: "Just finished reading a great book.",
      username: users[1].username,
        reactions: [
          { reactionBody: "Which book?", username: users[0].username },
        ],
      },
      {
    thoughtText: "I love photography, always looking for new angles.",
      username: users[2].username,
        reactions: [
          { reactionBody: "That’s so true!", username: users[3].username },
          { reactionBody: "I can relate!", username: users[4].username },
          {
            reactionBody: "A fun challenge every day!",
            username: users[0].username,
          },
        ],
      },
      {
    thoughtText: "Every day is a chance to learn something new!",
      username: users[3].username,
        reactions: [
          {
            reactionBody: "Keep up the great work!",
            username: users[1].username,
          },
        ],
      },
      {
    thoughtText: "Weekend hikes are my favorite way to recharge.",
      username: users[4].username,
        reactions: [
          { reactionBody: "Sounds amazing!", username: users[2].username },
        ],
      },
    ]);

    // Update each user to associate them with the corresponding thought and friends
  await User.findByIdAndUpdate(users[0]._id, {
      thoughts: [thoughts[0]._id],
      friends: [users[1]._id, users[2]._id],
    });
  await User.findByIdAndUpdate(users[1]._id, {
      thoughts: [thoughts[1]._id],
      friends: [users[0]._id, users[3]._id],
    });
  await User.findByIdAndUpdate(users[2]._id, {
      thoughts: [thoughts[2]._id],
      friends: [users[0]._id, users[4]._id],
    });
  await User.findByIdAndUpdate(users[3]._id, {
      thoughts: [thoughts[3]._id],
      friends: [users[1]._id],
    });
  await User.findByIdAndUpdate(users[4]._id, {
      thoughts: [thoughts[4]._id],
      friends: [users[2]._id],
    });

    // Log success message once the database seeding is complete
    console.log("Database seeded successfully! 🌱");

    // Exit the process with a successful status code
    process.exit(0);
  } catch (error) {
    // Log any errors that occur during the database seeding process
    console.error("Error seeding database:", error);

    // Exit the process with an error status code
    process.exit(1);
  }
};

// Call the seedDB function to run the seeding process
seedDB();
