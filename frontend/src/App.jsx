import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginSignUpPage from "./components/LoginSignUp/LoginSignUpPage";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginSignUpPage />} />
            <Route path="main" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
