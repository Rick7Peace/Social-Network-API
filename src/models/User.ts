// Import necessary modules from mongoose
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId;
    friends: Schema.Types.ObjectId;
    friendCount: number;
}

// Define the schema for the User model
const userSchema = new Schema({
    // Username field: required, unique, and trimmed of extra spaces
    username: {
        type: String,
        required: true, // Ensures the field is required
        unique: true,   // Ensures the value is unique across all users
        trim: true,     // Removes any extra spaces around the username
    },
    // Email field: required, unique, and must match an email pattern
    email: {
        type: String,
        required: true, // Ensures the field is required
        unique: true,   // Ensures the value is unique across all users
        match: [/.+@.+\..+/, 'Must match an email address!'], // Regular expression to validate email format
    },
    // Array to store references to thoughts created by the user
    thoughts: [
        {
            type: Schema.Types.ObjectId, // Each thought is represented by an ObjectId
            ref: 'Thought', // Reference to the Thought model, indicating each thought belongs to this user
        },
    ],
    // Array to store references to friends (other users)
    friends: [
        {
            type: Schema.Types.ObjectId, // Each friend is represented by an ObjectId
            ref: 'User', // Reference to the User model, indicating the friend is another user
        },
    ],
}, {
    // Configuration options for how the data is converted to JSON
    toJSON: {
        virtuals: true, // Include virtual properties in the JSON output
    },
    id: false, // Disable the 'id' field that mongoose normally adds to the model
});

// Define a virtual property to calculate the number of friends a user has
userSchema.virtual('friendCount').get(function () {
    // Return the length of the friends array to represent the friend count
    return this.friends.length;
});

// Create the User model using the schema and export it
const User = model('User', userSchema);

// Export the User model to be used in other parts of the application
export default User;
