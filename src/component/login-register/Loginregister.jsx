import React, { useState } from "react";
// import loginbg from "../../componentpic/login-reg2.jpg";
// import '../jquery';
import axios from "axios";
import $ from "jquery";
import "./login-register.css";

const Loginregister = () => {
  $(document).ready(function () {
    $(".register-link").click(function () {
      $(".wrapper").addClass("active");
    });

    $(".login-link").click(function () {
      $(".wrapper").removeClass("active");
    });
  });

  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");

  const handleloginsubmit = (e) => {
    e.preventDefault();
    try {
      if (loginemail && loginpassword) {
        const formdata = new FormData();
        formdata.append("email", loginemail);
        formdata.append("password", loginpassword);

        axios
          .post("http://localhost:5001/users/login'", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data.message);
          })
          .catch((err) => {
            console.error("Upload error:", err);
          });
        navigate("/login");
      } else {
        alert("input invalid");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleregistersubmit = (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        const formdata = new FormData();
        formdata.append("username", username);
        formdata.append("email", email);
        formdata.append("password", password);

        axios
          .post("http://localhost:5001/users", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data.message);
          })
          .catch((err) => {
            console.error("Upload error:", err);
          });
        navigate("/login");
      } else {
        alert("input invalid");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
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
                <label> Email</label>
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
              <div className="profile-select">
                <ion-icon name="person-circle"></ion-icon>
              </div>
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
