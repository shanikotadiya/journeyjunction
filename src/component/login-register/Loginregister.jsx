import React, { useEffect, useState } from "react";
// import loginbg from "../../componentpic/login-reg2.jpg";
// import '../jquery';
import $ from "jquery";
import "./login-register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Loginregister = () => {
  $(document).ready(function () {
    $(".register-link").click(function () {
      $(".wrapper").addClass("active");
    });

    $(".login-link").click(function () {
      $(".wrapper").removeClass("active");
    });
  });

  //---------------------------------REGISTER-----------------------------

  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleregistersubmit = (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("password", password);

        axios
          .post("http://localhost:5000/users", formdata, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 200) {
              toast.success("Register Successfull", {
                onClose: () => {
                  window.location.reload();
                },
                style: { minWidth: "300px", fontSize: "14px" },
              });
            } else {
              toast.error("something invalid", {
                style: { minWidth: "300px" },
              });
            }
          })
          .catch((err) => {
            console.error("Upload error:", err);
            toast.error("Network Error", {
              style: { minWidth: "300px" },
            });
          });
      } else {
        alert("input invalid");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //---------------------------LOGIN------------------------------

  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const navigate = useNavigate();

  const handleloginsubmit = (e) => {
    e.preventDefault();
    try {
      if (loginemail && loginpassword) {
        const formdata = new FormData();
        formdata.append("email", loginemail);
        formdata.append("password", loginpassword);

        axios
          .post("http://localhost:5000/users/login", formdata, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status == 200) {
              toast.success("Login Successfull", {
                onClose: () => {
                  navigate("/body");
                },
                style: { minWidth: "300px" },
              });
            } else {
              toast.error("input invalid", {
                onClose: () => {
                  window.location.reload();
                },
                style: { minWidth: "300px" },
              });
            }
          })
          .catch((err) => {
            console.error("Upload error:", err);
            toast.error("Network error !", {
              style: { minWidth: "300px" },
            });
          });
      } else {
        alert("input invalid");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="login-register-body">
        <div className="wrapper">
          <span className="icon-close">
            <ion-icon name="close"></ion-icon>
          </span>
          <div className="form-box login">
            <h2>Login</h2>
            <form onSubmit={handleloginsubmit}>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  type="text"
                  required
                  onChange={(event) => setloginemail(event.target.value)}
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  type="password"
                  required
                  onChange={(event) => setloginpassword(event.target.value)}
                />
                <label> Password</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="">Forgot Password?</a>
              </div>
              <button type="submit" className="btn">
                Login
              </button>
              <div className="login-register">
                <p>
                  Don't have an account?
                  <a href="#" className="register-link">
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
          <div className="form-box register">
            <h2>Registration</h2>
            <form onSubmit={handleregistersubmit}>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="person"></ion-icon>
                </span>
                <input
                  type="text"
                  required
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label>Username</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  type="text"
                  required
                  onChange={(event) => setemail(event.target.value)}
                />
                <label> Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  type="password"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
                <label> Password</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />I agree to the tearms & condition
                </label>
              </div>
              <button type="submit" className="btn">
                Register
              </button>
              <div className="login-register">
                <p>
                  Already have an account?
                  <a href="#" className="login-link">
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Loginregister;
