import { RequestHandler } from "express";
import { BadRequestError } from "../errors";
import Task from "../models/Task";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const getAllDueTasks: RequestHandler = async (req, res) => {
  const userId = (req as any).user.id;

  let thisWeekTasks = Task.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        isDone: false,
        $expr: { $eq: [{ $week: "$lastUpdated" }, { $week: new Date() }] },
      },
    },
  ]);

  // let todayTasks = Task.aggregate([
  //   {
  //     $match: {
  //       user: new mongoose.Types.ObjectId(userId),
  //       isDone: false,
  //       $expr: { $eq: [{ $day: "$lastUpdated" }, { $day: new Date() }] },
  //     },
  //   },
  // ]);

  let previousTasks = Task.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        isDone: false,
        $expr: {
          $or: [
            { $lt: [{ $week: "$lastUpdated" }, { $week: new Date() }] },
            { $lt: [{ $month: "$lastUpdated" }, { $month: new Date() }] },
            { $lt: [{ $year: "$lastUpdated" }, { $year: new Date() }] },
          ],
        },
      },
    },
  ]);

  [thisWeekTasks, previousTasks] = (await Promise.all([
    thisWeekTasks,
    previousTasks,
  ])) as any;

  res.status(StatusCodes.OK).json({ thisWeekTasks, previousTasks });
};

const getAllCompletedTasks: RequestHandler = async (req, res) => {
  const userId = (req as any).user.id;

  const tasks = await Task.find({
    isDone: true,
    user: new mongoose.Types.ObjectId(userId),
  });

  res.status(StatusCodes.OK).json({ tasks });
};

const addTask: RequestHandler = async (req, res) => {
  const {
    name,
    day,
    color,
    isDone,
    description,
    start,
    duration,
    lastUpdated,
  } = req.body;

  if (!name) {
    throw new BadRequestError("A name is required.");
  }

  const task = await Task.create({
    name,
    day,
    color,
    isDone,
    description,
    start,
    duration,
    lastUpdated,
    user: (req as any).user.id,
  });

  res.status(StatusCodes.OK).json({ task });
};

const updateTask: RequestHandler = async (req, res) => {
  const { id: taskId } = req.params;

  if (!taskId) {
    throw new BadRequestError("A task ID is required.");
  }

  const {
    name,
    day,
    color,
    isDone,
    description,
    start,
    duration,
    lastUpdated,
  } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: taskId },
    { name, day, color, isDone, description, start, duration, lastUpdated },
    { new: true }
  );

  res.status(StatusCodes.OK).json({ task });
};

const removeTask: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("A task ID is required.");
  }

  await Task.findOneAndDelete({ _id: id });

  res.json({ success: "Task removed." });
};

const getSingleTask: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("A task ID is requied.");
  }

  const task = await Task.findOne({ id });

  res.status(StatusCodes.OK).json({ task });
};

export {
  getAllDueTasks,
  getAllCompletedTasks,
  addTask,
  updateTask,
  removeTask,
  getSingleTask,
};
