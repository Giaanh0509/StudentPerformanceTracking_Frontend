import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { useState } from "react";
import UserService from "../../services/UserService";


export const SignUp = () => {

    const [user, setUser] = useState({
        id: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        const value = e.target.value; 
        setUser({...user, [e.target.name]: value});
    }

    const saveUser = (e) => {
        e.preventDefault();
        UserService.saveUser(user)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err);
        })
    };

    return (
        <div className="w-8/12 h-5/6 bg-white grid grid-cols-5">
            <div className="col-span-2 text-white bg-gradient-to-l from-[#4df1bb] to-[#1c8764] flex flex-col justify-center items-center gap-y-8">
                <div className=" text-4xl font-montserrat font-bold">Welcome Back!</div>
                <div className="flex justify-center text-center font-montserrat mx-14">
                    <span className="shawdow-text">To keep connected with us plase login with your personal info</span>
                </div>
                <div className="font-montserrat border-solid border-2 px-20 py-3 mt-5 rounded-full hover:bg-[#059666]">
                    <button className="font-semibold"> SIGN IN
                    </button>
                </div>
            </div>
            <div className="col-span-3 flex flex-col justify-start items-center font-montserrat gap-y-4">
                <div className="text-5xl text-[#38B593] font-bold mt-14 mb-16">Create Account</div>
                <div className="flex flex-col gap-y-5 w-3/5">
                        <div className="flex items-center gap-x-2 bg-[#F4F8F5] px-2 py-1">
                            <  FaRegUser className="size-5 ml-2" />
                            <input 
                                type="text" 
                                name="username" 
                                value={user.username} 
                                onChange={(e) => handleChange(e)}
                                className="p-2 bg-[#F4F8F5] focus:outline-none" 
                                placeholder="Username" />
                        </div>

                        <div className="flex items-center gap-x-2 bg-[#F4F8F5] px-2 py-1">
                            <  RiLockPasswordLine className="size-6 ml-2" />
                            <input 
                                type="text" 
                                name="password" 
                                value={user.password} 
                                onChange={(e) => handleChange(e)}
                                className="p-2 bg-[#F4F8F5] focus:outline-none" 
                                placeholder="Password" />
                        </div>

                        <div className="flex items-center gap-x-2 bg-[#F4F8F5] px-2 py-1">
                            <MdOutlineEmail className="size-6 ml-2" />
                            <input 
                                type="text" 
                                name="email" 
                                value={user.email} 
                                onChange={(e) => handleChange(e)}
                                className="p-2 bg-[#F4F8F5] focus:outline-none" 
                                placeholder="Email" />
                        </div>

                        <div className="flex items-center gap-x-2 bg-[#F4F8F5] px-2 py-1">
                            <MdLocalPhone className="size-6 ml-2" />
                            <input 
                                type="text" 
                                name="phoneNumber" 
                                value={user.phoneNumber} 
                                onChange={(e) => handleChange(e)}
                                className="p-2 bg-[#F4F8F5] focus:outline-none" 
                                placeholder="PhoneNumber" />
                        </div>
                </div>

                <div className="text-white bg-[#1dcc92] py-3 px-20 rounded-full mt-4 hover:bg-[#08ae77] font-semibold">
                    <button onClick={saveUser}>SIGN UP</button>
                </div>

                <div className="">or register with</div>

                <div className="flex gap-x-4">
                    <FaSquareFacebook className="size-8" />
                    <FaSquareXTwitter className="size-8" />
                    <FaLinkedin className="size-8" />
                </div>
            </div>
        </div>
    )
}