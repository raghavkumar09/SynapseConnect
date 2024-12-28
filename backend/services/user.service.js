import User from "../models/user.model.js";

export const createUser = async ({ email, password}) => {

    if(!email || !password) {
        throw new Error("Email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await User.hashPassword(password);

    const user = await User.create({ email, password: hashedPassword });
    return user;
}

export const getAllUsers = async ({ userId }) => {
    const users = await User.find(
        { _id: { $ne: userId } }
    );
    return users;
}