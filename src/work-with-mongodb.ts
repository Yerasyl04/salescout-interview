// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

import mongoose, { Schema, model } from 'mongoose';

type DuplicatedUsers = {
    email: string;
};

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const User = model('User', userSchema);

async function manageUsers(): Promise<DuplicatedUsers[]> {
    await mongoose.connect('mongodb://localhost:27017/your_database_name', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    await User.collection.drop().catch(() => {}); 

    await User.insertMany([
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Charlie', email: 'charlie@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
    ]);

    const duplicates = await User.aggregate([
        { $group: { _id: '$email', count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } },
        { $project: { email: '$_id', _id: 0 } },
    ]);

    await mongoose.disconnect();

    return duplicates;
}

module.exports = { manageUsers };
