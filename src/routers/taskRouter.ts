import { Router } from "express";
import {
  addTask,
  getAllDueTasks,
  getAllCompletedTasks,
  getSingleTask,
  removeTask,
  updateTask,
} from "../controllers/taskController";

const router = Router();

router.route("/").get(getAllDueTasks).post(addTask);
router.route("/completed").get(getAllCompletedTasks);
router.route("/:id").get(getSingleTask).patch(updateTask).delete(removeTask);

export default router;
