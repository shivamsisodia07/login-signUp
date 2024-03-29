import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = ({ setcurrentView, onForgetPassClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, seterrormessage] = useState("");
  const [isError, setisError] = useState(false);
  const navigate=useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          email,fullName,password
        }
      );
      console.log(data);
      if (data.statusCode === 200) {
        navigate("main");
      }
      
    } catch (error) {
      console.log(error);
      seterrormessage(error.response.data.message);
      setisError(true);

      setTimeout(() => {
        setisError(false);
        seterrormessage("");
      }, 10000);
    }
  };

  return (
    <>
      <div className=" md:h-[70vh] flex flex-col justify-center items-center border-gray-300 rounded-t-full border p-8 md:p-4 mb-4">
        <div className="flex justify-center items-center mt-2 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M11.1904 1.5957C11.1904 1.18149 11.5262 0.845703 11.9404 0.845703C12.3546 0.845703 12.6904 1.18149 12.6904 1.5957V10.285L17.2437 5.73173C17.5366 5.43884 18.0115 5.43884 18.3044 5.73173C18.5973 6.02462 18.5973 6.4995 18.3044 6.79239L13.7511 11.3457H22.4404C22.8546 11.3457 23.1904 11.6815 23.1904 12.0957C23.1904 12.5099 22.8546 12.8457 22.4404 12.8457H13.7511L18.3044 17.399C18.5973 17.6919 18.5973 18.1668 18.3044 18.4597C18.0115 18.7526 17.5366 18.7526 17.2437 18.4597L12.6904 13.9064V22.5957C12.6904 23.0099 12.3546 23.3457 11.9404 23.3457C11.5262 23.3457 11.1904 23.0099 11.1904 22.5957V13.9063L6.63712 18.4597C6.34422 18.7525 5.86935 18.7525 5.57646 18.4597C5.28356 18.1668 5.28356 17.6919 5.57646 17.399L10.1297 12.8457H1.44043C1.02622 12.8457 0.69043 12.5099 0.69043 12.0957C0.69043 11.6815 1.02622 11.3457 1.44043 11.3457H10.1297L5.57645 6.79241C5.28356 6.49951 5.28356 6.02464 5.57645 5.73175C5.86934 5.43885 6.34422 5.43885 6.63711 5.73175L11.1904 10.2851V1.5957Z"
              fill="#1F1F1F"
            />
          </svg>
        </div>
       
        <div className="flex flex-col justify-center items-center mb-4">
          <div className="text-stone-900 text-3xl  md:text-2xl font-medium font-['sans-serif']">
            Create your free account{" "}
          </div>
          <div>
            <span className="text-stone-900 text-2xl md:text-lg font-medium font-['sans-serif']">
              Takes less than
            </span>{" "}
            <span className=" text-green-600 text-xl md:text-lg font-medium font-['sans-serif']">
              5 minutes...
            </span>{" "}
          </div>
        </div>
        <div className="mx-10">
          <div className="mb-4">
          {isError ? (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-2 py-1 mb-2 rounded relative"
            role="alert"
          >
            <strong class="font-bold text-sm">Holy smokes! </strong>
            <span class="block sm:inline text-sm">{errormessage}</span>
            {/* <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span> */}
          </div>
        ) : (
          ""
        )}
            <form onSubmit={handleSubmit}>
              <input
                type="name"
                name="FullName"
                className="w-full border-b border-blue-gray-900 mb-2 md:text-sm px-2 py-2"
                placeholder="Enter your Full Name"
                value={fullName}
                onChange={(e)=>{
                  setFullName(e.target.value)
                }}
              />
              <input
                type="email"
                name="email"
                className="w-full border-b border-blue-gray-900 mb-2  md:text-sm  px-2 py-2"
                placeholder="Enter your email"
                onChange={(e)=>{
                  setemail(e.target.value)
                }}
              />

              <div className="relative border-b border-blue-gray-900 mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full md:text-sm px-2 py-2 "
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-2 py-2 "
                >
                  {showPassword ? "🙂" : "😌"}
                </button>
              </div>
              <div className="flex justify-center mb-2 mt-4">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn text-xl md:text-lg py-2 px-4 border border-black focus:border-green-700 rounded-3xl"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
