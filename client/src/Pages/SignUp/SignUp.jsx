import { React, useState } from "react";
import "./SignUp.css";
import Button from "@mui/material/Button";
import { Navigate, Link } from "react-router-dom";
import { setToken, getToken } from "./Token";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [sotp, setsotp] = useState();
  const [OTP, setOTP] = useState();
  const [isValidOTP, setIsValidOTP] = useState(false);
  const [toSignIn, setSignIn] = useState(false);

  let Token;

  async function Createit(name, email, pass) {
    try {
      const resp = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          UserName: name,
          email: email,
          pass: pass,
        },
      });
      const message1 = document.querySelector(".message1");
      message1.innerHTML = " ";
      const data = await resp.json();

      if (resp.status == 200) {
        const fDiv = document.querySelector(".complete_su");
        const sDiv = document.querySelector(".si1");

        if (fDiv) {
          fDiv.classList.toggle("rem1");
          sDiv.classList.toggle("rem2");
          generateAgain(email);
        }
      } else {
        const message1 = document.querySelector(".message1");
        message1.innerHTML = data.message;
      }
    } catch (err) {
      console.log(`Error1 : ${err.message}`);
    }
  }

  async function generateAgain(email) {
    try {
      console.log("In GenerateAgain Block");
      const generate = await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          UserName: name,
          email: email,
          pass: pass,
        },
      });

      const message2 = document.querySelector(".message2");
      message2.innerHTML = " ";
      const mailid = await generate.json();

      if (generate.status == 200) {
        setsotp(mailid.otp);
        console.log(mailid.otp);
        message2.innerHTML = mailid.message;
      } else {
        message2.innerHTML = mailid.message;
      }
    } catch (error) {
      console.log("Error in fetch gen req : ", error);
    }
  }

  function goBack() {
    const fDiv = document.querySelector(".complete_su");
    const sDiv = document.querySelector(".si1");
    if (fDiv) {
      fDiv.classList.toggle("rem1");
      sDiv.classList.toggle("rem2");
    }
  }

  async function createAccount(sotp, OTP) {
    console.log("sotp", sotp);
    console.log("OTP", OTP);
    if (sotp == OTP) {
      setIsValidOTP(true);

      const create = await fetch("http://localhost:5000/createUser", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          userName: name,
          email: email,
          pass: pass,
        },
      });

      const data2 = await create.json();
      const message2 = document.querySelector(".message2");
      if (create.status == 200) {
        console.log("User created !");
        setToken(data2.token);
        console.log(getToken());
      } else {
        const data2 = await create.json();
        message2.innerHTML = data2.message;
        console.log("Error while creating User !");
      }
    } else {
      console.log("Invalid OTP");
    }
  }

  function toSignin() {
    setSignIn(true);
    setTimeout(() => {
      setSignIn(false);
    }, 2000);
  }
  return (
    <>
      <div className="complete_su ">
        <div className="su_blk">
          <h3 className="su_title">Sign Up</h3>
          <p className="su_p1">
            Learn on your own time from top universities and businesses.
          </p>
          <h3 className="su_s1 su">FULL NAME</h3> <br />
          <input
            type="text"
            name="name"
            id=""
            className="i1"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            placeholder="Enter your full name"
          />{" "}
          <br />
          <h3 className="su_s2 su">EMAIL</h3> <br />
          <input
            type="text"
            name="email"
            id=""
            className="i1"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="name@gmail.com"
          />{" "}
          <br />
          <h3 className="su_s3 su">PASSWORD</h3> <br />
          <input
            type="text"
            name="pass"
            id=""
            className="i1"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            placeholder="Enter Password"
          />
          <br />
          <p className="message1"></p>
          <Button
            variant="contained"
            style={{ marginTop: "37px" }}
            onClick={() => {
              Createit(name, email, pass);
            }}
          >
            Sign Up
          </Button>
          <br />
          <h5 id="status"></h5>
          <h6 className="su_h6">
            {" "}
            Already have an account ?{" "}
            <Link to="/">
              <span className="su_sp1">Sign In</span>
            </Link>
            {/* {toSignin ? <Navigate to="/" /> : <></>} */}
          </h6>
        </div>
      </div>

      {/*  Verification Block !!!*/}
      <div className="si1 rem2">
        <div className="si_blk">
          <h3 className="si_title">Verification</h3>
          <button
            id="vB1"
            style={{ marginTop: "1px", backgroundColor: "white" }}
            onClick={goBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1.5em"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
          <p className="si_p">
            Please verify by entering the OTP sent to the email
          </p>
          <h6 className="si_h6"></h6>
          <h3 className="si_s1 si">OTP</h3> <br />
          <input
            type="number"
            name="otp"
            id=""
            className="i1"
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            placeholder="Enter OTP"
          />
          <br />
          <br />
          <div className="si_buttons">
            {<p className="message2"> </p>}
            <Button
              id="si_go"
              variant="contained"
              style={{ marginTop: "1px" }}
              onClick={() => {
                generateAgain(email);
              }}
            >
              Generate Again
            </Button>
            <Button
              id="si_ca"
              variant="contained"
              style={{ marginTop: "1px" }}
              onClick={() => {
                createAccount(sotp, OTP);
              }}
            >
              Create Account
            </Button>
            {isValidOTP ? <Navigate to="/home" /> : <p></p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
