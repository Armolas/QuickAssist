import Button from "../components/Button"
import { useState, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';
import Loading from "../components/Loading";


function ResetPassword() {
    const email = localStorage.getItem('passwordResetEmail')
    const {resetPassword, requestResetPassword} = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        otp: '',
        password: '',
        password2: ''
    })

    if (!email) {
        return (
        <Loading/>
        )
    }
    if (formData.email === '') {
        setFormData({ ...formData, email: email });
    }

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword(formData)
        localStorage.removeItem('passwordResetEmail')
    };

    const requestOtp = async () => {
        await requestResetPassword(formData.email)
    }

    return(
        <div className="bg-violet-50 flex flex-col items-center justify-around w-96 min-h-96 m-10 self-center shadow-2xl">
            <h2 className="font-bold text-violet-600 text-xl">Reset Password</h2>
            <form action="" onSubmit={handleSubmit} className="space-y-3 flex flex-col justify-center">
                <div className="flex flex-col space-y-2 w-80">
                    <label className="text-sm" htmlFor="otp">Enter your password reset OTP:</label>
                    <input className="shadow-xl p-1" onChange={handleChange} type="text" name="otp" id="otp" placeholder="Enter password reset OTP" />
                    <label className="text-sm" htmlFor="password">Input new password:</label>
                    <input className="shadow-xl p-1" onChange={handleChange} type="password" name="password" id="password" placeholder="Enter new password" />
                    <label className="text-sm" htmlFor="otp">Confirm Password:</label>
                    <input className="shadow-xl p-1" onChange={handleChange} type="password" name="password2" id="password2" placeholder="Confirm password" />
                </div>
                <p onClick={requestOtp} className="text-xs hover:cursor-pointer text-violet-500">resend OTP</p>
                <Button className="self-center font-bold text-white" type="submit" color="bg-violet-500" text="Change Password"/> 
            </form>
        </div>
    )
}
export default ResetPassword