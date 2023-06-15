import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
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
  email: {
    type: String,
    unique: [true, "Please choose a different email."],
    validate: {
      validator: isEmail,
      message: (props: ValidationProps) =>
        `${props.value} is not a valid email!`,
    },
    required: [true, "An email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: 6,
    select: false,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash((this as any).password, salt);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createJWT = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const User = mongoose.model("User", userSchema);
export default User;
