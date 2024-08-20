import Button from "../components/Button"
import Review from "../components/Review"
import StarRating from "../components/Rating"
import Booking from "../components/Booking"
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { ProfileContext } from "../contexts/ProfileContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
    const [bookings, setBookings] = useState([])
    const [reviews, setReviews] = useState([])
    const [activeBookings, setActiveBookings] = useState([])
    const [bookingHistory, setBookingHistory] = useState([])

    const { user } = useContext(AuthContext)
    const { getUserBookings, getProviderBookings, getReviews } = useContext(ProfileContext)

    useEffect(() => {
        const fetchBookings = async (id) => {
            let allBookings = []
            if (user.type === 'provider') {
                allBookings = await getProviderBookings(id);
            } else if (user.type === 'user') {
                allBookings = await getUserBookings(id);
            }
            if (allBookings) {
                setBookings(allBookings)
            }
        };

        const fetchReviews = async (id) => {
            const allReviews = await getReviews(id)
            if (allReviews) {
                setReviews(allReviews)
            }
        }

        fetchBookings(user.id);
        if (user.type === 'provider') {
            fetchReviews(user.id)
        }
    }, []);

    useEffect(() => {
        const active = bookings.filter((booking) => booking.status === 'Pending' || booking.status === 'Active')
        setActiveBookings(active)
        const history = bookings.filter((booking) => booking.status === 'Cancelled' || booking.status === 'Completed')
        setBookingHistory(history)
    }, [bookings])
    console.log(activeBookings)
    console.log(user)
    return (
        <div className="bg-violet-50 self-center pt-10 m-5 p-5 rounded-md space-y-10 shadow-2xl">
            <div className="flex gap-5">
                <div className=" bg-gray-200 rounded-full h-48 w-48 flex justify-center items-center"><FontAwesomeIcon icon={faUser} className="text-gray-400 text-9xl" /></div>
                    <div className="self-center font-semibold text-lg max-w-md">
                        <div className="">
                            <h2>Full Name: {user.firstName} {user.lastName}</h2>
                            <h2>Address: {user.address}</h2>
                            <h2>Email: {user.email}</h2>
                            <h2>Phone Number: {user.phoneNumber}</h2>
                            {
                                user.type === 'provider' && (
                                <>
                                <h2>About: {user.about}</h2>
                                <h2>Gender: {user.gender}</h2>     
                                <h2>Skills: {user.skills.join(', ')}</h2>
                                <h2>Charge per Hour: &#8358;{user.chargePerHour}</h2>
                                <div className="flex">
                                <h2>Rating: </h2>
                                <StarRating className="flex pt-1.5 pl-2" totalStars={user.rating}/>
                                </div>
                                </>
                                )
                            }
                        </div>
                    <div className="mr-20 mt-3">
                        <Button className="bg-violet-300 p-2 pl-4 pr-4" text="Edit Profile"/>
                    </div>
                </div>
            </div>
            <div className="space-y-5">
                <div className="bg-gray-200 rounded-lg p-3">
                    <h3 className="font-extrabold text-lg">Active Bookings</h3>
                    {
                        activeBookings.length > 0 ?
                        activeBookings.map((booking) => (
                            <Booking key={booking.id} booking={booking}/>
                        )) :
                        <h3 className="bg-violet-50 p-3 italic text-sm rounded-lg mt-3">No active Bookings...</h3>
                    }
                </div>
                <div className="bg-gray-200 rounded-lg p-3">
                    <h3 className="font-extrabold text-lg">Booking History</h3>
                    {
                        bookingHistory.length > 0 ?
                        bookingHistory.map((booking) => (
                            <Booking key={booking.id} booking={booking}/>
                        )) :
                        <h3 className="bg-violet-50 p-3 italic text-sm rounded-lg mt-3">Your booking history shows here...</h3>
                    }
                </div>
            </div>
            {
                user.type === 'provider' && (
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
                )
            }
        </div>
    )
}
export default Dashboard