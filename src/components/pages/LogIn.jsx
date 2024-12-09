import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[#F0F4F3]">

            <div className="w-8/12 h-5/6 bg-white grid grid-cols-5">
                <div className="col-span-3 flex flex-col justify-start items-center font-montserrat gap-y-4">
                    <div className="text-5xl text-[#38B593] font-extrabold mt-14 mb-10">Sign in</div>

                    <div className="flex gap-x-4 mb-4">
                        <FaSquareFacebook className="size-8" />
                        <FaSquareXTwitter className="size-8" />
                        <FaLinkedin className="size-8" />
                    </div>

                    <div className="">or use your account</div>

                    <div className="flex flex-col gap-y-5 w-3/5 mt-2">
                        <div className="flex items-center gap-x-2 bg-[#F4F8F5] px-2 py-1">
                            <FaRegUser className="size-5 ml-2" />
                            <input
                                type="text"
                                className="p-2 bg-[#F4F8F5] focus:outline-none"
                                placeholder="Username" />
                        </div>

                        <div className="flex items-center gap-x-2 bg-[#F4F8F5] px-2 py-1">
                            <  RiLockPasswordLine className="size-6 ml-2" />
                            <input
                                type="text"
                                className="p-2 bg-[#F4F8F5] focus:outline-none"
                                placeholder="Password" />
                        </div>
                    </div>

                    <div className="text-base mt-4">Forgot your password?</div>

                    <div className="text-white bg-[#1dcc92] py-3 px-20 rounded-full mt-2 hover:bg-[#08ae77] font-semibold">
                        <button>SIGN IN</button>
                    </div>

                </div>
                <div className="col-span-2 text-white bg-gradient-to-l from-[#4df1bb] to-[#1c8764] flex flex-col justify-center items-center gap-y-8">
                    <div className=" text-4xl font-montserrat font-extrabold">Hello, Friend!</div>
                    <div className="flex justify-center text-center font-montserrat mx-14">
                        <span className="shawdow-text">Enter your personal details and start journey with us</span>
                    </div>
                    <div className="font-montserrat border-solid border-2 px-20 py-3 mt-3 rounded-full hover:bg-[#059666]">
                        <button onClick={() => navigate('/signup')} className="font-semibold"> SIGN UP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}