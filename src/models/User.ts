import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

interface ValidationProps {
  path: string;
  value: unknown;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name is required."],
    minLength: 3,
    maxLength: 25,
  },
  username: {
    type: String,
    unique: [true, "Please choose a different username."],
  },
  email: {
    type: String,
    unique: [true, "Please choose a different email."],
    validate: {
      validator: isEmail,
      message: (props: ValidationProps) =>
        `${props.value} is not a valid phone number!`,
    },
    required: function () {
      return !(this as { username: string }).username;
    },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: 6,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createJWT = function () {
  const token = jwt.sign(this._id, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
