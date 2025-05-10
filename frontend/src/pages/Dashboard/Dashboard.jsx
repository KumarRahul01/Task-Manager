import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";
import {
  MdDelete,
  MdEdit,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa";
import { IoCheckbox, IoCheckboxOutline } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

const initialTask = {
  title: "",
  description: "",
  isCompleted: false,
  isImportant: false,
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [taskList, setTaskList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(initialTask);

  const baseUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("uid_token");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/task`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTaskList(data?.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleModal = (task = null) => {
    setCurrentTask(task || initialTask);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setCurrentTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = currentTask._id
      ? `/task/update/${currentTask._id}`
      : "/task/createTask";
    const method = currentTask._id ? axios.put : axios.post;

    try {
      await method(`${baseUrl}${url}`, currentTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(currentTask._id ? "Task updated" : "Task created");
      setIsModalOpen(false);
      fetchTasks();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  // update task when click star
  const toggleImportant = async (task) => {
    try {
      await axios.put(
        `${baseUrl}/task/update/${task._id}`,
        {
          ...task,
          isImportant: !task.isImportant,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const toggleCompleted = async (task) => {
    try {
      await axios.put(
        `${baseUrl}/task/update/${task._id}`,
        {
          ...task,
          isCompleted: !task.isCompleted,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${baseUrl}/task/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task deleted");
      fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredTasks = taskList.filter((task) => {
    if (activeTab === "important") return task.isImportant;
    if (activeTab === "completed") return task.isCompleted;
    if (activeTab === "incomplete") return !task.isCompleted;
    return true;
  });

  return (
    <div className="dashboard">
      <div>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="task_container">
        <button className="add-task-btn" onClick={() => handleModal()}>
          Add Task
        </button>

        {filteredTasks.length ? (
          <div className="task_grid">
            {filteredTasks.map((task) => (
              <div className="box" key={task._id}>
                <div className="flex">
                  <h1>{task.title}</h1>
                  <div className="star" onClick={() => toggleImportant(task)}>
                    {task.isImportant ? (
                      <FaStar color="gold" size={20} />
                    ) : (
                      <FaRegStar size={20} />
                    )}
                  </div>
                </div>
                <p>{task.description}</p>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <div
                    onClick={() => toggleCompleted(task)}
                    style={{ marginTop: "30px" }}
                  >
                    {task.isCompleted ? (
                      <IoCheckbox size={30} />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank size={30} />
                    )}
                  </div>
                  <div>
                    <button onClick={() => handleModal(task)}>
                      <MdEdit />
                    </button>
                    <button onClick={() => deleteTask(task._id)}>
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No tasks found</div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-box" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{currentTask._id ? "Edit Task" : "Add Task"}</h3>
            <form onSubmit={handleSubmit}>
              {["title", "description"].map((field) => (
                <label key={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                  <input
                    type="text"
                    name={field}
                    value={currentTask[field]}
                    onChange={handleChange}
                    required
                  />
                </label>
              ))}
              {["isImportant", "isCompleted"].map((field) => (
                <label key={field}>
                  {field.replace("is", "")}:
                  <input
                    type="checkbox"
                    name={field}
                    checked={currentTask[field]}
                    onChange={handleChange}
                  />
                </label>
              ))}
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
