import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Eye, EyeOff, LoaderCircle, Upload,Trash2, User } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import axiosConfig from "../Utill/AxiosConfig";
import { API_ENDPOINTS } from "../Utill/Apiendpoints";
import uploadProfileImage from "../Utill/uploadProfileImage";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null); 

  const navigate = useNavigate();

  // Handle Image Upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // limit file size to 2MB
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setProfileImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImageFile(null);
    // reset file input also
    document.getElementById("profileImage").value = "";
  };

  // Handle Form Submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    // Basic validation
    if (!fullName || !email || !password) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
       setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
       setIsLoading(false);
      return;
    }

    console.log({ fullName, email, password, profileImage });
    try{
        let imageUrl = null;
        console.log("Image file:", imageUrl);
        if (imageFile) {
           imageUrl = await uploadProfileImage(imageFile);
        }
        console.log("Uploaded Image URL:", imageUrl);
        const response= await axiosConfig.post(API_ENDPOINTS.REGISTER,{
            fullName,
            email,
            password,
            profileImageUrl: imageUrl,
        })
        console.log("Registration response:", response);
        if(response.status===201){
    
            toast.success("Account created successfully!");
            setTimeout(() => {
              navigate("/login");
            }, 1200);
        }

    }catch(error){
        console.error("Error creating account:", error);
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
     { /*<Toaster position="top-right" reverseOrder={false} />*/}
      <img
        src={assets.login_bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl p-6">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create An Account
          </h3>
          <p className="text-sm text-slate-600 text-center mb-6">
            Start tracking your spending by joining with us
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ✅ Profile Image Upload */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-400 hover:bg-gray-200 transition overflow-hidden"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-20 h-20 object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-10 h-10 text-purple-500" />
                  )}
                </label>

                {/* ✅ Trash icon appears if image exists */}
                {profileImage && (
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                         className="absolute -bottom-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700 curser-pointer"
                  >
                      <Trash2 size={14} />
                      </button>
                  )}
              </div>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload Profile Image (optional)
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 cursor-pointer flex items-center justify-center gap-2 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
             {
                isLoading ? (
                    <>
                        <LoaderCircle className="animate-spin w-5 h-5 "></LoaderCircle>
                        Signing Up...
                    </>
                ):(
                    "Sign Up"
                )
             }
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
