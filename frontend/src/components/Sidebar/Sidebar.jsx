import { useState } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("uid_token");
    navigate("/");
  };

  return (
    <div className="side_box">
      <div className="title">
        <h4>
          <span style={{ fontSize: "30px" }}>👋</span>{" "}
          {localStorage.getItem("username")}
        </h4>
      </div>

      <div className="buttons">
        <div
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Tasks
        </div>
        <div
          className={activeTab === "important" ? "active" : ""}
          onClick={() => setActiveTab("important")}
        >
          Important Tasks
        </div>
        <div
          className={activeTab === "completed" ? "active" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed Tasks
        </div>
        <div
          className={activeTab === "incomplete" ? "active" : ""}
          onClick={() => setActiveTab("incomplete")}
        >
          Incomplete Tasks
        </div>
      </div>

      <div className="logout" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default Sidebar;
