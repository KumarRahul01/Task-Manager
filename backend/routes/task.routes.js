import express from "express";
import { handleCreateTask, handleDeleteTask, handleGetAllTasks, handleUpdateTask } from "../controllers/task.controller.js";
import { validateAccessToken } from "../middleware/auth.js";

const router = express.Router();

router.use(validateAccessToken);

router.post("/createTask", handleCreateTask);
router.get("/", handleGetAllTasks);
router.put("/update/:id", handleUpdateTask);
router.delete("/delete/:id", handleDeleteTask);


export default router;
