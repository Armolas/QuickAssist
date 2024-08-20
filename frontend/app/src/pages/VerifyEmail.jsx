import Button from "../components/Button"
import { useState, useContext, useEffect } from "react";
import { AuthContext } from '../contexts/AuthContext';

function VerifyEmail() {
    const { user, verifyEmail, requestVerifyOtp } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        otp: ''
    })
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
    if (formData.email === '') {
        setFormData({ ...formData, email: user.email });
    }

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const resendOtp = async () => {
        await requestVerifyOtp(user.email)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await verifyEmail(formData)
    };

    return(
        <div className="bg-violet-50 flex flex-col items-center justify-around w-96 min-h-60 m-10 self-center shadow-2xl">
            <h2 className="font-bold text-violet-600 text-xl">Verify Your Email Address</h2>
            <form action="" onSubmit={handleSubmit} className="space-y-3 flex flex-col justify-center">
                <div className="flex flex-col space-y-2 w-80">
                    <label className="text-sm" htmlFor="otp">Enter the OTP sent to your email address:</label>
                    <input className="shadow-xl p-1" onChange={handleChange} type="text" name="otp" id="otp" placeholder="Enter your OTP" />
                </div>
                <p onClick={resendOtp} className="text-xs hover:cursor-pointer text-violet-500">resend OTP</p>
                <Button className="w-24 self-center font-bold text-white" type="submit" color="bg-violet-500" text="Verify"/> 
            </form>
        </div>
    )
}
export default VerifyEmail