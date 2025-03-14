import User from '../models/User.js';
import Thought from '../models/Thought.js';

const cleanDB = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Database cleared');
  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  }
};

export default cleanDB; 