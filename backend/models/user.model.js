import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength : [4, "Email must be at least 4 characters long"],
        maxLength : [100, "Email must be at most 100 characters long"]
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

userSchema.statics.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}; 

userSchema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};

const User = mongoose.model("user", userSchema);

export default User;