import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Menu, User, X } from 'lucide-react';
import { assets } from '../assets/assets';
import Sidebar from './Sidebar';
const Menubar = ({activeMenu}) => {

    const [openSideMenu, setOpenSideMenu]=useState(false);
    const [showDropdown, setShowDropdown]=useState(false);
    const dropDownRef=React.useRef(null);

    const{user,clearUser}=useContext(AppContext);

    const navigate=useNavigate()
   // console.log("user from menubar", user);

    const handleLogout=()=>{
        localStorage.clear()
        clearUser();
        setShowDropdown(false);
        navigate('/login');
        
    }

    useEffect(()=>{
        const handleClickOutside=(event)=>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setShowDropdown(false);
            }
        }

        document.addEventListener('mousedown',handleClickOutside);

        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside);
        }
    })

    

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 py-4 sm:px-7 shadow-md sticky top-0 z-50">
      {/* Left side menu button and title */}

        <div className="flex items-center gap-5">
            <button onClick={()=>setOpenSideMenu(!openSideMenu)} className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors" >
                {
                    openSideMenu ? (
                        <X size={20} className='text-2xl'/>
                    ):(
                        <Menu size={20} className='text-2xl'/>
                    )
                }

            </button>
            <div className='flex items-center gap-2'>
                <img src={assets.logo} alt="logo" className='w-10 h-10 object-contain'/>
                <span className='text-lg font-medium text-black truncate'>Money Manager</span>
            </div>
        </div>




      {/* right side -avatar photo */}
      <div className='relative' ref={dropDownRef}>
       <button onClick={()=> setShowDropdown(!showDropdown)} className=" flex  items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transistion-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2 cursor-pointer">
                <User size={20} className='text-purple-600'/>

       </button>
         {/* dropdown menu */}
         {
            showDropdown && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50'>
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                                <User size={16} className='w-4 h-4  text-purple-600'/>

                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                    {user ? user.fullName : ""}
                                </p>
                                <p className="text-xs text-gray-500 truncate">{user ? user.email :""}</p>
                            </div>

                        </div>

                    </div>
                    <div className="py-1">
                        {
                            user===null ? (
                                <>
                                    <button onClick={()=>{
                                        navigate('/login')
                                    }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <LogIn className='inline-block mr-2 w-4 h-4 text-gray-600'/>
                                        Login</button>
                                    <button onClick={()=>{
                                        navigate('/signup')
                                    }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Sign Up</button>
                                </>
                            ):(
                                <button onClick={()=>{handleLogout();
                                    // handle logout
                                }} className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <LogOut className='inline-block mr-2 w-4 h-4 text-gray-600'/>
                                    Logout</button>
                            )
                        }

                    </div>
                </div>
            )
         }

      </div>
      {/* mobile side menu */}

     { openSideMenu && (
        <div className='absolute top-16 left-0 right-0 lg:hidden w-64 h-[calc(100vh-64px)] bg-white border border-gray-200/50 shadow-md p-5 z-30 '> 
            <Sidebar activeMenu={activeMenu}/>
            {
                // SIDE_BAR_DATA.map((item,index)=>(
                //     <button onClick={()=>navigate(item.path)}
                //          key={`menu_${index}`} className='cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3'>
                //         <item.icon className='w-5 h-5 text-gray-600'/>
                //         <span className='text-gray-700 font-medium'>{item.label}</span>
                //     </button>
                // ))
            }

        </div>
     )}

    </div>
    
  )
}

export default Menubar