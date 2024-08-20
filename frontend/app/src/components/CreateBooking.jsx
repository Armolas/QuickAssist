import Button from "./Button";
import { useState, useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";


function CreateBooking({user, provider}) {
    const [formData, setFormData] = useState({
        service: '',
        date: '',
        user_id: user.id || "",
        provider_id: provider.id || "",
        description: "",
        status: "Active"
    })

    const { createBooking } = useContext(ProfileContext)

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const getCurrentDateTime = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        const localISOTime = new Date(now - offset).toISOString().slice(0, 16);
        return localISOTime;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        createBooking(formData)
    };

    return (
        <div className="bg-violet-50 flex flex-col items-center w-96 min-h-96 m-10 pb-10 self-center shadow-2xl">
            <h2 className="font-bold text-violet-600 text-xl m-10">Create Your Booking</h2>
            <form action="" onSubmit={handleSubmit} className="space-y-3 flex text-to-black flex-col justify-center">
                <div className="flex flex-col space-y-2 w-80 mb-10">
                    <label className="text-sm" htmlFor="date">Booking Date:</label>
                    <input className="shadow-xl p-1" min={getCurrentDateTime()} onChange={handleChange} type="datetime-local" value={formData.date} name="date" required/>
                    <label className="text-sm" htmlFor="details">Booking Details:</label>
                    <input className="shadow-xl p-1" onChange={handleChange} type="text" name="description" value={formData.description} id="desc" placeholder="Enter details about the booking" />
                    <label className="text-sm" htmlFor="service">Select Service:</label>
                    <select
                        id="service"
                        value={formData.service}
                        name="service"
                        onChange={handleChange}
                        className="shadow-xl p-1"
                        required
                    >
                        <option value="" disabled>Select an option</option>
                        {
                            provider.skills.map((skill) => (
                                <option key={skill} value={skill}>{skill}</option>
                            ))
                        }
                    </select>
                </div>
                <Button className="self-center font-bold text-white mb-10" type="submit" color="bg-violet-500" text="Confirm Booking"/> 
            </form>
        </div>
    )
}
export default CreateBooking