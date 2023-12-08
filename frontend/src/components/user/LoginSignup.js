import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import "./LoginSignup.css";
import {useNavigate} from 'react-router-dom'
import { loginUserSliceFun,registerUserSliceFun } from "../../ReduxToolkitStore/Slices/UserSlice";
// import Loading from "../layout/Loader/Loading";


const LoginSignup = () => {
  const logintab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setuser] = useState({
    name:'',
    email:'',
    password:''
  })

  const dispatch = useDispatch()

  const {isAuthenticated} = useSelector(state => (state.UserSlice))

  const [avatarPreview, setavatarPreview] = useState('/Profile.png')
  const [avatar, setavatar] = useState('')

  const {name,email,password} = user

  const SwitchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      logintab.current.classList.remove("shiftToLeft");
    } else if (tab === "register") {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");

      registerTab.current.classList.add("shiftToNeutralForm");
      logintab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault()
    loginUserSliceFun(loginEmail,loginPassword,dispatch)
    console.log('submitted');

  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setavatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const navigate = useNavigate()

  useEffect(()=>{

    if(isAuthenticated){
      navigate('/account')
    }

  },[isAuthenticated, navigate])

  const registerSubmit = (e) =>{
    e.preventDefault()

    const myForm = new FormData()

    myForm.set('name',name)
    myForm.set('email',email)
    myForm.set('password',password)
    myForm.set('avatar',avatar)

    registerUserSliceFun(myForm,dispatch)
  }

  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div className="">
            <div className="login_signUp_toggle">
              <p onClick={(e) => SwitchTab(e, "login")}>LOGIN</p>
              <p onClick={(e) => SwitchTab(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form ref={logintab} onSubmit={loginSubmit} className="loginForm">
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="password"
                required
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </div>
            <Link to={"/password/forget"} />
            <input type="submit" value={"login"} className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="text"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>

            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="text"
                placeholder="PAssword"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div className="" id="registerImage">
              <img src={avatarPreview} alt="avatar" />
              <input type="file" name="avatar" accept="image/*" onChange={registerDataChange}/>
              
            </div>

            <input
              type="submit"
              value="Register"
              className="signUpBtn"
              // disabled={Loading ? true : false}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
