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
    <div className='text-white'>
        {
            loading ? (
                <div className='spinner'></div>
            ) : 
            (
                <div>
                    <h1>Choose New Password</h1>
                    <p>Almost done. Enter your new password and youre all set</p>
                    <form onSubmit={handleOnSubmit}>
                        <label>
                            <p>New Password *</p>
                            <input required type={showPassword ? "text" : "password"} name='password' value={password} onChange={handleOnChange} placeholder='Password'/>
                            <span onClick={() => setShowPassword((prev) => !prev)}>
                                {
                                    showPassword ? <MdOutlineRemoveRedEye fontSize={24}/> : <IoEyeOff fontSize={24}/>
                                }
                            </span>
                        </label>

                        <label>
                            <p>Confirm New Password *</p>
                            <input required type={showConfirmPassword ? "text" : "password"} name='confirmPassword' value={confirmPassword} onChange={handleOnChange} placeholder='Confirm New Password'/>
                            <span onClick={() => setshowConfirmPassword((prev) => !prev)}>
                                {
                                    showConfirmPassword ? <MdOutlineRemoveRedEye fontSize={24}/> : <IoEyeOff fontSize={24}/>
                                }
                            </span>
                        </label>
                        <button type='submit'>
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