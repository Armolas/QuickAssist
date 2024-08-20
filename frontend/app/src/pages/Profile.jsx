import { useLocation } from "react-router-dom"
import Button from "../components/Button"
import Review from "../components/Review"
import StarRating from "../components/Rating"
import {useState, useEffect, useContext } from 'react'
import { ProfileContext } from "../contexts/ProfileContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CreateBooking from "../components/CreateBooking";
import ReactModal from 'react-modal'
import { AuthContext } from "../contexts/AuthContext"
import Loading from "../components/Loading"

ReactModal.setAppElement('#root')

function Profile() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    
    const id = params.get("id")
    const [provider, setProvider] = useState(null)
    const [reviews, setReviews] = useState([])
    const { user } = useContext(AuthContext)

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const {getReviews, getProfile} = useContext(ProfileContext)

    useEffect(() => {
        const fetchProfile = async (id) => {
            const profile = await getProfile(id)
            if (profile) {
                setProvider(profile)
            }
        }
        const fetchReviews = async (id) => {
            const allReviews = await getReviews(id)
            if (allReviews) {
                setReviews(allReviews)
            }
        }

        fetchProfile(id)
        fetchReviews(id)
    }, [id]);
    
    if (!provider) {
        return (
        <Loading/>
        )
    }

    return (
        <div className="bg-violet-50 self-center m-5 p-5 max-w-3xl rounded-md space-y-5 shadow-2xl">
            <div className="flex gap-5">
                <div className=" bg-gray-200 rounded-full flex justify-center items-center h-48 w-48"><FontAwesomeIcon icon={faUser} className="text-gray-400 text-9xl" /></div>
                    <div className="self-center font-semibold text-lg">
                        <div className="max-w-lg">
                            <h2>Full Name: {provider.firstName} {provider.lastName}</h2>
                            <h2>About: {provider.about}</h2>
                            <h2>Address: {provider.address}</h2>
                            <h2>Gender: {provider.gender}</h2>     
                            <h2>Skills: {provider.skills.join(", ")}</h2>
                            <h2>Charge per Hour: &#8358;{provider.chargePerHour}</h2>
                            <div className="flex">
                            <h2>Rating: </h2>
                            <StarRating className="flex pt-1.5 pl-2" totalStars={provider.rating}/>
                            </div>
                        </div>
                    <div className="mr-20 mt-3 flex gap-5">
                        <Button className="bg-violet-300 p-2" text="Contact"/>
                        <Button className="bg-violet-300 p-2" onClick={openModal} text="Book"/>
                        <ReactModal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Booking Creation"
                            className="w-96  mx-auto flex flex-col justify-center items-center"
                            style={{
                            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }
                            }}
                        >
                            <CreateBooking provider={provider} user={user}/>
                            <button onClick={closeModal} className="text-gray-400">close</button>
                        </ReactModal>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 rounded-lg p-3">
                <h3 className="font-extrabold text-lg">Reviews and Ratings</h3>
                    {
                        reviews.length > 0 ?
                        reviews.map(({review, rating}) => (
                            <Review review={review} stars={rating}/>
                        )) :
                        <h3 className="bg-violet-50 p-3 italic text-sm rounded-lg mt-3">No reviews yet...</h3>
                    }
            </div>
        </div>
    )
}
export default Profile