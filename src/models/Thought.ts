import { Schema, model, Document } from 'mongoose';
import reactionSchema from './Reaction.js';
import { dateFormat } from '../utils/dateFormat.js';


export interface IThought extends Document {
    thoughtText: String;
    createdAt: Date;
    username: string;
    reactions: [typeof reactionSchema]
    reactionCount: number;
}

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: any) => dateFormat(timestamp)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        getters: true
    },
    timestamps: true,
    id: false
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
