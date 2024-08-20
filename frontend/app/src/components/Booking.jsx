import { useContext, useState } from "react"
import Button from "./Button"
import { ProfileContext } from "../contexts/ProfileContext"
import { AuthContext } from '../contexts/AuthContext'
import { CreateReview } from "./CreateReview"
import ReactModal from 'react-modal'

function Booking({booking}) {
    const { updateBooking, createReview } = useContext(ProfileContext)
    const { user } = useContext(AuthContext)

    async function cancel() {
        console.log('Cancel')
        await updateBooking(booking.id, {"status": "Cancelled"});
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="bg-violet-50 p-3 rounded-lg mt-3 flex justify-between">
            {
                <div>
                    <h3>Service: {booking.service}</h3>
                    {
                        user.type === 'user' ? 
                        <h3>Provider's Name: {booking.provider}</h3> :
                        <h3>Customer's Name: {booking.user}</h3>
                    }
                    <h3>Date: {booking.date}</h3>
                    <h3>Status: {booking.status}</h3>
                </div>
            }
            {
                <div>
                    {
                        booking.status !== 'Active' && user.type == 'user' && (
                        <>
                        <Button className="bg-violet-400 text-semibold" onClick={openModal} text="Review"/>
                        <ReactModal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Review"
                            className="w-96  mx-auto flex flex-col justify-center items-center"
                            style={{
                            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }
                            }}
                        >
                            <CreateReview provider_id={booking.provider_id}/>
                            <button onClick={closeModal} className="text-gray-400">close</button>
                        </ReactModal>
                        </>
                    )
                    }
                    {
                        booking.status === "Active" && (
                        <Button className="bg-red-400 text-semibold hover:border-red-800" onClick={cancel} text="Cancel Booking"/>)

                    }
                </div>
            }
        </div>
    )
}
export default Booking