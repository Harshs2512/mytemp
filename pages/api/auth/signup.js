import User from "../../../models/UserModel";
import db from "../../../db/db";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }
  await db.connect();
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    res.status(422).json({
      message: "User exists already",
    });
    await db.disconnect();
    return;
  }

  const newUser = await User({
    username,
    email,
    password: bcryptjs.hashSync(password),
  });

  const user = await newUser.save();

  await db.disconnect();

  res.status(201).send({
    message: "Created user",
    _id: user._id,
    name: user.username,
    email: user.email,
    role: user.role,
  });
};

export default handler;
