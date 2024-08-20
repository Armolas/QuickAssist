import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useState, useContext, useEffect } from "react";
import { AuthContext } from '../contexts/AuthContext';

function Login() {
    const { login, isAuthenticated } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
      if (isAuthenticated) {
        navigate('/')
      }
    }, [isAuthenticated])
    
    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);

        await login(formData)
    };


    return(
        <div className="bg-violet-50 flex flex-col items-center justify-around w-96 min-h-96 m-10 self-center shadow-2xl">
            <h2 className="font-bold text-violet-600 text-xl">Sign in to your account</h2>
            <form action="" onSubmit={handleSubmit} className="space-y-3 flex flex-col justify-center">
                <div className="flex flex-col space-y-2 w-80">
                    <input className="shadow-xl p-1" onChange={handleChange} type="email" name="email" placeholder="Enter email address..." />
                    <input className="shadow-xl p-1" onChange={handleChange} type="password" name="password" id="pwd" placeholder="password" />
                </div>
                <Link to="/request-reset-password">
                <p className="text-xs text-violet-500">Forgot password?</p>
                </Link>
                <Button className="w-24 self-center font-bold text-white" type="submit" color="bg-violet-500" text="Log In"/> 
            </form>
            <div className="flex flex-col">
                <Link to="/signup">
                    <p className="text-xs text-violet-500 self-center pb-1">Don't have an account?</p>
                </Link>
            </div>
        </div>
    )
}
export default Login