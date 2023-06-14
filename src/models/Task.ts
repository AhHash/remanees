import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A name is required."],
    },
    day: {
      type: Number,
      //   required: [true, "A day is required."],
    },
    color: {
      type: String,
      //   required: [true, "A color is required"],
    },
    isDone: {
      type: Boolean,
      //   required: [true, "Task status is required."],
      default: false,
    },
    description: {
      type: String,
      MaxLength: 500,
    },
    start: {
      type: Number,
      min: 0,
      max: 1439,
    },
    duration: {
      type: Number,
      min: 0,
      max: 1439,
      validate: {
        validator: function (value: number) {
          return (this as any).start + value < 1439;
        },
        message: "A task cannot be split into to days.",
      },
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      select: false,
    },
    lastUpdated: {
      type: Date,
      default: function () {
        console.log((this as any).day);
        if ((this as any).day) {
          console.log("in");
          const date = new Date();
          date.setDate(
            date.getUTCDate() + (this as any).day - 1 - new Date().getUTCDay()
          );
          return date;
        }
        return new Date();
      },
    },
  }
  // { timestamps: true }
);

const Task = mongoose.model("task", taskSchema);
export default Task;
