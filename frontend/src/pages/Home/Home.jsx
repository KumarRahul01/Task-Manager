import { useState } from "react";
import "./Home.css";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup";
import taskImg from "../../assets/taskImg.jpg";

const Home = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);

  return (
    <div className="container">
      <div className="flex">
        <div className="left_section">
          <>
            <div className="title">Manage Your Tasks Effectively</div>

            {/* img */}
            <div className="img_container">
              <img src={taskImg} alt="task-img" />
            </div>
          </>
        </div>
        <div className="right_section">
          <div className="title">Welcome Back</div>
          <p className="sub_title">Enter your details below</p>

          {/* import component */}
          {showLoginForm ? (
            <>
              <Login />
              <p>
                Don't have an account{" "}
                <span className="bold" onClick={() => setShowLoginForm(false)}>
                  Create Here
                </span>
              </p>
            </>
          ) : (
            <>
              <Signup />
              <p>
                Already have an account{" "}
                <span className="bold" onClick={() => setShowLoginForm(true)}>
                  Login Here
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
