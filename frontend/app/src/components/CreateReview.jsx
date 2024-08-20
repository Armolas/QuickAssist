import Button from "./Button";
import { useState, useContext } from "react";
import { ProfileContext } from "../contexts/ProfileContext";

function CreateReview({provider_id}) {
    const [formData, setFormData] = useState({
        review: '',
        rating: 1,
        provider_id: provider_id || ""
    })

    const {createReview} = useContext(ProfileContext)

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createReview(formData)
    };

    return (
        <div className="bg-violet-50 flex flex-col items-center w-96 min-h-96 m-10 pb-10 self-center shadow-2xl">
            <h2 className="font-bold text-violet-600 text-xl m-10">Share Your Review</h2>
            <form action="" onSubmit={handleSubmit} className="space-y-3 flex text-to-black flex-col justify-center">
                <div className="flex flex-col space-y-2 w-80 mb-10">
                    <label className="text-sm" htmlFor="rating">How Satisfied are you with this service?</label>
                    <input className="shadow-xl p-1" min={1} max={5} onChange={handleChange} type="number" value={formData.rating} name="rating" placeholder="rate this service between 1 and 5" required/>
                    <label className="text-sm" htmlFor="review">Write a Review for this service:</label>
                    <input className="shadow-xl p-1" onChange={handleChange} type="text" name="review" value={formData.review} id="review" placeholder="Share your experience..." />
                </div>
                <Button className="self-center font-bold text-white mb-10" type="submit" color="bg-violet-500" text="Submit Review"/> 
            </form>
        </div>
    )
}
export {CreateReview};