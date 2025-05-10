import { Task } from "../models/task.model.js";

export const handleCreateTask = async (req, res) => {

  try {

    const userId = req.user.id;

    const { title, description, isImportant, isCompleted } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // create new task
    const newTask = await Task.create({
      title, description, isCompleted, isImportant, user: userId
    })

    return res.status(201).json({ message: "Task created successfully!", data: newTask });


  } catch (error) {
    return res.status(500).json({ error: "Server error failed to create task" });
  }

}

export const handleGetAllTasks = async (req, res) => {
  try {

    const userId = req.user.id;

    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    if (!tasks) {
      return res.status(400).json({ error: "No task found" });
    }

    return res.status(200).json({ data: tasks });

  } catch (error) {
    return res.status(500).json({ error: "Server error failed to fetch tasks" });
  }
};

export const handleUpdateTask = async (req, res) => {
  try {

    const userId = req.user.id;
    const taskId = req.params.id;

    console.log("userId", userId);
    console.log("taskId", taskId);


    const { title, description, isImportant, isCompleted } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description, isImportant, isCompleted, user: userId },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(400).json({ error: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated successfully!", data: updatedTask });

  } catch (error) {
    return res.status(500).json({ error: "Server error failed to update task" })
  }
}

export const handleDeleteTask = async (req, res) => {
  try {

    const userId = req.user.id;
    const taskId = req.params.id;

    const deleted = await Task.findOneAndDelete({ _id: taskId, user: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully!" });

  } catch (error) {
    res.status(500).json({ error: "Server error failed to delete task" });
  }
};