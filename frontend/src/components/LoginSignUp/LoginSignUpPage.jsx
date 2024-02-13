import {useState} from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import ResetPass from "./ResetPassword";
import Forgetpassword from "./ForgetPass"
import bg from "../../public/bg2.png";
import ResendLink from "./ResendLink";
import ResetPasswordDone from "./ResetPasswordDone";
import { NavLink } from "react-router-dom";
const LoginSignUpPage = () => {

 const [currentView, setcurrentView] = useState('login');

 const handleLoginClick=()=>{
  setcurrentView('login')
 }
 const handleSignInClick=()=>{
  setcurrentView('signin');
 }
 const handleForgetPassClick=()=>{
  setcurrentView('forget-pass')
 }
 const handleGetLinkClick=()=>{
  setcurrentView('resend-link')
 }
 const handleSetNewPassClick=()=>{
  setcurrentView('reset-pass');
 }
 const handleResetPassClick=()=>{
  setcurrentView('reset-pass-done')
 }
  return (
    <div className="flex flex-col h-screen max-h-max md:flex-row justify-center items-center ">
      <div
        className="w-full md:w-2/3 bg-cover bg-center h-[60vh] md:h-screen  md:p-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className=" mt-4 md:mt-0 text-3xl text-center md:text-start md:text-4xl font-bold text-white">Welcome to Blinkit</h1>
      </div>

      <div className="md:w-1/3 h-screen p-8">
        <div className="flex justify-center items-center gap-3 mb-4">
          <NavLink to="/" className="px-4 py-2 border border-black focus:border-green-700 rounded-full" onClick={handleLoginClick}>
           LogIn
          </NavLink>
          <button className="px-4 py-2 border border-black focus:border-green-700 rounded-full" onClick={handleSignInClick}>Sign Up</button>
        </div>

       {currentView === 'login' && <Login setcurrentView={setcurrentView} onSignInClick={handleSignInClick} onForgetPassClick={handleForgetPassClick} />}
       {currentView === 'signin' && <SignUp setcurrentView={setcurrentView} onForgetPassClick={handleForgetPassClick} />}
       {currentView === 'forget-pass' && <Forgetpassword setcurrentView={setcurrentView} onGetLinkClick={handleGetLinkClick} />}
       {currentView === 'resend-link' && <ResendLink  setcurrentView={setcurrentView} onSetNewPassClick={handleSetNewPassClick} />}
       {currentView === 'reset-pass' && <ResetPass setcurrentView={setcurrentView} onResetPassClick={handleResetPassClick} />}
       {currentView === 'reset-pass-done' && <ResetPasswordDone/>}
      
      </div>
    </div>
  );
};

export default LoginSignUpPage;
