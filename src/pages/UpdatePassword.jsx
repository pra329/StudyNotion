import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authApi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOff } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const[formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const{password,confirmPassword} = formData;
    const[showPassword,setShowPassword] = useState(false);
    const[showConfirmPassword,setshowConfirmPassword] = useState(false);
    const{loading} = useSelector((state) => state.auth)
    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name]:e.target.value
            }
        ))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token,navigate))
    }
    return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {
            loading ? (
                <div className='spinner'></div>
            ) : 
            (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">Choose New Password</h1>
                    <p>Almost done. Enter your new password and youre all set</p>
                    <form onSubmit={handleOnSubmit}>
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"><sup className="text-pink-200">*</sup></p>
                            <input required type={showPassword ? "text" : "password"} name='password' value={password} onChange={handleOnChange} placeholder='Password'  className="form-style w-full !pr-10"/>
                            <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                {
                                    showPassword ? <MdOutlineRemoveRedEye fontSize={24} fill="#AFB2BF" /> : <IoEyeOff fontSize={24}  fill="#AFB2BF"/>
                                }
                            </span>
                        </label>

                        <label className="relative mt-3 block">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Confirm New Password <sup className="text-pink-200">*</sup></p>
                            <input required type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={confirmPassword} onChange={handleOnChange} placeholder='Confirm New Password'className="form-style w-full !pr-10"/>
                            <span onClick={() => setshowConfirmPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                                {
                                    showConfirmPassword ? <MdOutlineRemoveRedEye fontSize={24}  fill="#AFB2BF" /> : <IoEyeOff fontSize={24}  fill="#AFB2BF" />
                                }
                            </span>
                        </label>
                        <button type='submit'  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">
                                Reset Password
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                    <Link to="/login">
                    <div className='flex flex-row items-center'>
                    <IoIosArrowRoundBack className='text-white'/> <p className="flex items-center gap-x-2 text-richblack-5">Back To Login</p>
                    </div>
                    </Link>
                </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword