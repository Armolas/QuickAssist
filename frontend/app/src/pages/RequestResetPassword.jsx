import Button from "../components/Button"
import { useState, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext';

function RequestResetPassword() {
    const { requestResetPassword } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: ''
    })

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await requestResetPassword(formData.email)
        localStorage.setItem('passwordResetEmail', formData.email)
    };

    return(
        <div className="bg-violet-50 flex flex-col items-center justify-center gap-10 w-96 min-h-60 m-10 self-center shadow-2xl">
            <h2 className="font-bold text-violet-600 text-xl">Reset Password</h2>
            <form action="" onSubmit={handleSubmit} className="space-y-3 flex flex-col justify-center">
                <div className="flex flex-col space-y-2 w-80">
                    <label className="text-sm" htmlFor="email">Enter your registered email:</label>
                    <input className="shadow-xl p-1" onChange={handleChange} type="text" name="email" id="email" placeholder="Enter your email address" />
                </div>
                <Button className="self-center font-bold text-white" type="submit" color="bg-violet-500" text="Request OTP"/> 
            </form>
        </div>
    )
}
export default RequestResetPassword