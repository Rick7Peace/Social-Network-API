import { Schema, model, Document } from 'mongoose';

// Define the User interface, extending Mongoose's Document
export interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Array<Schema.Types.ObjectId>;
    friends: Array<Schema.Types.ObjectId>;
    friendCount: number;
}

// Create the user schema with required fields and validations
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'], // Ensures the username is provided
        unique: true,  // Ensures no duplicates exist
        trim: true,    // Automatically trims extra spaces
    },
    email: {
        type: String,
        required: [true, 'Email is required'], // Ensures the email is provided
        unique: true,  // Ensures no duplicates exist
        match: [/.+@.+\..+/, 'Please provide a valid email address'], // Regex to validate email format
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought', // Reference to the Thought model
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
}, {
    toJSON: {
        virtuals: true, // Include virtual properties in the output
    },
    id: false, // Disable the default 'id' field
});

// Define a virtual property for calculating the number of friends
userSchema.virtual('friendCount').get(function () {
    return this.friends.length; // Return the count of friends
});

// Create the model from the schema and export it
const User = model<IUser>('User', userSchema);

// Export the User model for use in other parts of the application
export default User;
