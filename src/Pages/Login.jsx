import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff,LoaderCircle } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { assets } from "../assets/assets";
import axiosConfig from "../Utill/AxiosConfig";
import { AppContext } from "../context/AppContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const{setUser}=useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);;

    // Basic validations
    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required!");
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email!");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      setIsLoading(false);
      return;
    }

    //Logic to handle login
    try{
       const response=await axiosConfig.post("/login", {
        email,
        password,
      });
      const {token,user}=response.data;
      if(token){
        localStorage.setItem("token", token);
        setUser(user); 
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/"); // redirect after login
        }, 1200);
      }
    }catch (error) {
        if (error.response) {
           if (error.response.status === 400 || error.response.status === 401) {
              toast.error("Invalid email or password!");
           } else {
                toast.error(error.response.data?.message || "Something went wrong!");
          }
        } else {
            toast.error("Network error! Please try again later.");
        }
            console.error("Login error:", error);
        } finally {
             setIsLoading(false);
      }


    // ✅ Success simulation
    
    
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
     { /*<Toaster position="top-right" reverseOrder={false} />*/}
      {/* Background Image */}
      <img
        src={assets.login_bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Login to continue tracking your money
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Password with Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              disabled={isLoading}
              type="submit"
              className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 cursor-pointer flex items-center justify-center gap-2 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {
                isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5 "/> Logging In...
                  </>
                ):("Login")
              }
            </button>
          </form>

          {/* Extra */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-purple-600 cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
