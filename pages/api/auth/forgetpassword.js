import User from "../../../models/UserModel";
import db from "../../../db/db";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const { email } = req.body;

  if (
    !email ||
    !email.includes("@")
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

  await db.disconnect();

  res.status(201).send({
    message: "Message send",
  });
};

export default handler;
