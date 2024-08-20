import { createContext } from 'react';
import { toast } from 'react-toastify';

const ProfileContext = createContext();

const notify_error = (err) => toast.error(err, {
    position: "top-right",
    autoClose: 2000,
  });

const notify = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 2000,
});

function ProfileProvider({ children }) {
    const token = localStorage.getItem('access_token');
    const getProfile = async (id) => {
        const access_token = localStorage.getItem('access_token');
        try {
            const response = await fetch(`http://localhost:5000/api/v1/providers/${id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData.error);
                return;
            }
    
            const data = await response.json();
            return (data.data);
    
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    const getProviderBookings = async (id) => {
        const access_token = localStorage.getItem('access_token');
        try {
            const response = await fetch(`http://localhost:5000/api/v1/providers/${id}/bookings`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData.error);
                return;
            }
    
            const data = await response.json();
            return (data.data);
    
        } catch (error) {
            console.error("Request failed:", error);
        }
    }

    const getUserBookings = async (id) => {
        const access_token = localStorage.getItem('access_token');
        try {
            const response = await fetch(`http://localhost:5000/api/v1/users/${id}/bookings`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData.error);
                return;
            }
    
            const data = await response.json();
            return (data.data);
    
        } catch (error) {
            console.error("Request failed:", error);
        }
    }

    const getReviews = async (id) => {
        const access_token = localStorage.getItem('access_token');
        try {
            const response = await fetch(`http://localhost:5000/api/v1/providers/${id}/reviews`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData.error);
                return;
            }
    
            const data = await response.json();
            return (data.data);
    
        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    async function createBooking(formData) {
        try {
            const response = await fetch("http://localhost:5000/api/v1/bookings", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                notify_error(errorData.error);
                return;
            }
    
            const data = await response.json();
            notify("Booking successfully created")
    
        } catch (error) {
            console.error("Booking request failed:", error);
        }
    }

    async function updateBooking(id, formData) {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/bookings/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                notify_error(errorData.error);
                return;
            }
    
            const data = await response.json();
            notify(data.message)
    
        } catch (error) {
            console.error("Booking request failed:", error);
        }
    }

    async function createReview(formData) {
        try {
            const response = await fetch("http://localhost:5000/api/v1/reviews", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                notify_error(errorData.error);
                return;
            }
    
            const data = await response.json();
            notify("Thank you for your review!")
    
        } catch (error) {
            console.error("Review failed:", error);
        }
    }

    return (
        <ProfileContext.Provider value={{ getProviderBookings, getUserBookings, getProfile, getReviews, createBooking, updateBooking, createReview }}>
            {children}
        </ProfileContext.Provider>
    );
}
export { ProfileContext, ProfileProvider };