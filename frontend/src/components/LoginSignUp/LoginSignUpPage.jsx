import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import bg from "../../public/bg2.png";
import { NavLink } from "react-router-dom";
const LoginSignUpPage = () => {
  const [currentView, setcurrentView] = useState("login");

  const handleLoginClick = () => {
    setcurrentView("login");
  };
  const handleSignInClick = () => {
    setcurrentView("signin");
  };
  return (
    <div className="flex flex-col h-screen max-h-max md:flex-row justify-center items-center ">
      <div
        className="w-full md:w-2/3 bg-cover bg-center h-[50vh] md:h-screen  md:p-4"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* <h1 className=" mt-4 md:mt-0 text-3xl text-center md:text-start md:text-4xl font-bold text-white">Welcome to Blinkit</h1> */}
      </div>

      <div className="w-full md:w-1/3 h-screen p-8  ">
        <div className="flex justify-center items-center gap-3 mb-4">
          <button
            className="w-[30%] px-4 py-2 border-2 text-white bg-[#529900] border-green-700 focus:border-yellow-700 rounded-full"
            onClick={handleLoginClick}
          >
            LogIn
          </button>
          <button
            className="w-[30%] px-4 py-2 border-2 text-white bg-[#529900] border-green-700 focus:border-yellow-700 rounded-full"
            onClick={handleSignInClick}
          >
             Sign Up
          </button>
         
         
        </div>

        {currentView === "login" && (
          <Login
            setcurrentView={setcurrentView}
            onSignInClick={handleSignInClick}
          />
        )}
        {currentView === "signin" && <SignUp setcurrentView={setcurrentView} />}
      </div>
    </div>
  );
};

export default LoginSignUpPage;
