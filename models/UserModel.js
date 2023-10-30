import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"]
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user",
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;