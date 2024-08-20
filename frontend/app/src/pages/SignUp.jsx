import { useContext, useState } from "react"
import Button from "../components/Button"
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
function SignUp() {
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const { register } = useContext(AuthContext)
    const user = params.get('user') || 'user';

    const [userType, setUserType] = useState(user);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        address: '',
        phoneNumber: "",
        about: "",
        age: 0,
        chargePerHour: 0,
        gender: '',
        skills: [],
        user_type: userType
    })
    const skillsAvail = ["House Cleaning", "Baby Sitter", "Cook", "Market Shopper", "Laundry"]
    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleSkillChange(e) {
        const {checked, value} = e.target;

        setFormData((prevState) => {
            if (checked) {
                return (
                    {
                        ...prevState,
                        skills: [...prevState.skills, value]
                    }
                )
            } else {
                return (
                    {
                        ...prevState,
                        skills: prevState.skills.filter(skill => skill !== value)
                    }
                )
            }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedFormData = {
            ...formData,
            user_type: userType // This line sets the correct user type
        };
        if (userType === 'user') {
            const { age, gender, about, skills, chargePerHour, ...userForm } = updatedFormData;
            register(userForm);
        } else{
            register(updatedFormData);
        }
    };

    return(
        <div className="bg-violet-50 flex flex-col items-center justify-around w-96 min-h-96 m-10 self-center shadow-2xl">
            <h2 className="font-bold text-violet-600 text-xl m-5">Create a new account</h2>
            <label className="font-semibold text-lg mb-2" htmlFor="">Register as</label>
            <div className="space-x-6 mb-5">
                <Button onClick={() => setUserType("user")} text="User" className={`${userType === 'user' ? 'bg-violet-300' : 'bg-violet-200'} p-2 w-16`} />
                <Button onClick={() => setUserType("provider")} text="Provider" className={`${userType === 'provider' ? 'bg-violet-300' : 'bg-violet-200'} p-2`} />
            </div>
            <form action="" onSubmit={handleSubmit} className="space-y-3 flex flex-col justify-center mb-10">
                <div className="flex flex-col space-y-2 w-80 mb-4">
                    <label className="text-sm" htmlFor="firstName">First Name:</label>
                    <input className="shadow-xl p-1" type="text" name="firstName" value={formData.firstName} required onChange={handleChange} id="firstName" placeholder="First Name" />
                    <label className="text-sm" htmlFor="lastName">Last Name:</label>
                    <input className="shadow-xl p-1" type="text" name="lastName" value={formData.lastName} required onChange={handleChange} id="lastName" placeholder="Last Name" />
                    <label className="text-sm" htmlFor="email">Email Address:</label>
                    <input className="shadow-xl p-1" type="email" name="email" value={formData.email} required onChange={handleChange} placeholder="Enter email address..." />
                    <label className="text-sm" htmlFor="address">Address:</label>
                    <input className="shadow-xl p-1" type="text" name="address" value={formData.address} onChange={handleChange} id="address" placeholder="123, Anywhere street...." />
                    <label className="text-sm" htmlFor="phoneNumber">Phone Number:</label>
                    <input className="shadow-xl p-1" type="tel" name="phoneNumber" value={formData.phone} required onChange={handleChange} placeholder="08012345678" />
                    {
                        userType === 'provider' && (
                            <>
                                <label className="text-sm" htmlFor="skill">Select skills:</label>
                                {
                                    skillsAvail.map((skill) => (
                                        <div key={skill}>
                                            <input className="shadow-xl" type="checkbox" name="skills" value={skill}
                                            checked={formData.skills.includes(skill)} onChange={handleSkillChange} />
                                            <label className="p-1" htmlFor={skill}>{skill}</label>
                                        </div>
                                    ))
                                }
                                <label className="text-sm" htmlFor="age">Age:</label>
                                <input className="shadow-xl p-1" type="number" name="age" min='18' max='60' value={formData.age} required onChange={handleChange} placeholder="How old are you?.." />
                                <label className="text-sm" htmlFor="gender">Gender:</label>
                                <input className="shadow-xl p-1" type="text" name="gender" value={formData.gender} required onChange={handleChange} placeholder="Type either Male or Female..." />
                                <label className="text-sm" htmlFor="chargePerHour">Charge Per Hour:</label>
                                <input className="shadow-xl p-1" type="number" name="chargePerHour" value={formData.chargePerHour} required onChange={handleChange} placeholder="How much do you charge per hour in Naira?" />
                                <label className="text-sm" htmlFor="about">Tell us about yourself:</label>
                                <input className="shadow-xl p-1" type="text" name="about" value={formData.about} required onChange={handleChange} placeholder="Tell us about you...." />
                            </>
                        )
                    }
                    <label className="text-sm" htmlFor="password">Password:</label>
                    <input className="shadow-xl p-1" type="password" name="password" value={formData.password} required onChange={handleChange} id="pwd" placeholder="password" />
                    <label className="text-sm" htmlFor="password2">Confirm password:</label>
                    <input className="shadow-xl p-1" type="password" name="password2" value={formData.password2} required onChange={handleChange} id="pwd2" placeholder="password" />
                </div>
                <Button className="w-24 self-center text-white font-bold" type="submit" color="bg-violet-500" text="Sign Up"/> 
            </form>
            <div className="flex flex-col mb-5">
                <Link className="self-center" to="/login">
                    <p className="text-xs text-violet-500 self-center pb-1">Already have an account?</p>
                </Link>
            </div>
        </div>
    )
}
export default SignUp