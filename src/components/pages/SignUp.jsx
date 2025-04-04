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
import { useNavigate } from 'react-router-dom';
import { PiUserListBold } from "react-icons/pi";
import { BiBookmark } from "react-icons/bi";



export const SignUp = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: "",
        username: "",
        password: "",
        email: "",
        name: "",
        phoneNumber: "",
        role: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setUser({ ...user, [e.target.name]: value });
    }

    const saveUser = (e) => {
        e.preventDefault();
        UserService.saveUser(user)
            .then((response) => {
                console.log(response);
                navigate('/signin');
            })
            .catch((err) => {
                console.error(err);
            })
    };

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[#F0F4F3]">
            <div className="w-8/12 h-5/6 bg-white grid grid-cols-5">
                <div className="col-span-2 text-white bg-gradient-to-l from-[#4df1bb] to-[#1c8764] flex flex-col justify-center items-center gap-y-8">
                    <div className=" text-4xl font-montserrat font-extrabold">Welcome Back!</div>
                    <div className="flex justify-center text-center font-montserrat mx-14">
                        <span className="shawdow-text">To keep connected with us plase login with your personal info</span>
                    </div>
                    <div className="font-montserrat border-solid border-2 px-20 py-3 mt-5 rounded-full hover:bg-[#059666]">
                        <button onClick={() => navigate('/signin')} className="font-semibold"> SIGN IN
                        </button>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col justify-start items-center font-montserrat gap-y-4">
                    <div className="text-5xl text-[#38B593] font-extrabold mt-14 mb-16">Create Account</div>
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
                                type="password"
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
                            <BiBookmark  className="size-6 ml-2" />
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={(e) => handleChange(e)}
                                className="p-2 bg-[#F4F8F5] focus:outline-none"
                                placeholder="Name" />
                        </div>

                        <div className="flex items-center gap-x-2 bg-[#F4F8F5] px-2 py-1">
                            <PiUserListBold className="size-6 ml-2"/>
                            <select
                                name="role"
                                value={user.role}
                                onChange={(e) => handleChange(e)}
                                className="p-2  bg-[#F4F8F5] focus:outline-none pr-48"
                                required
                            >
                                <option value="">Select a role</option>
                                <option value="teacher">Teacher</option>
                                <option value="learner">Learner</option>
                                <option value="expert">Expert</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-white bg-[#1dcc92] py-3 px-20 rounded-full mt-4 hover:bg-[#08ae77] font-semibold">
                        <button onClick={saveUser}>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}