import { createContext, useState, useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const notify_error = (err) => toast.error(err, {
        position: "top-right",
        autoClose: 2000,
      });

    const notify = (message) => toast.success(message, {
        position: "top-right",
        autoClose: 2000,
    });

    async function checkUser() {
        const token = localStorage.getItem('access_token');
        const currentUser = localStorage.getItem('user');

        if (!token) {
            setIsAuthenticated(false);
            localStorage.removeItem('user')
            return
        }
        if (isExpired(token)) {
            setIsAuthenticated(false);
            console.log("token expired")
            localStorage.removeItem('user');
        } else {
            setIsAuthenticated(true);
            setUser(JSON.parse(currentUser));
        }
    }

    useEffect(() => {
      checkUser();
    }, [])

    async function register(formData) {
        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/register", {
                method: 'POST',
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                notify_error(errorData.error);
                return;
            }
    
            const data = await response.json();
            notify("Account successfuly created!. Please sign in to your account")
            navigate('/login')
    
        } catch (error) {
            console.error("Login request failed:", error);
        }
    }
    

    async function login(formData) {
        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/login", {
                method: 'POST',
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                notify_error(errorData.error);
                return;
            }
    
            const data = await response.json();
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setIsAuthenticated(true);
            setUser(data.user);
            notify("Login Successful!")
            navigate('/dashboard')
    
        } catch (error) {
            console.error("Login request failed:", error);
        }
    }
    

    async function logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        setIsAuthenticated(false)
        setUser(null)
        notify("Logout Successful!")
        navigate('/')
    }

    async function requestVerifyOtp(email) {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/auth/verify-email?email=${email}`)

            if (!response.ok) {
                const errorData = await response.json();
                notify_error(errorData.error);
                return;
            }
            const data = await response.json();
            notify(data.message)
            
        } catch (error) {
            console.error("request failed:", error);
        }
    }

    async function verifyEmail(formData) {
        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/verify-email", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
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
            navigate('/')
    
        } catch (error) {
            console.error("Verification failed:", error);
        }
    }
    async function requestResetPassword(email) {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/auth/reset-password?email=${email}`)

            if (!response.ok) {
                const errorData = await response.json();
                notify_error(errorData.error);
                return;
            }
            const data = await response.json();
            notify(data.message)
            navigate('/reset-password')
            
        } catch (error) {
            console.error("request failed:", error);
        }
    }

    async function resetPassword(formData) {
        try {
            const response = await fetch("http://localhost:5000/api/v1/auth/reset-password", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
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
            navigate('/login')
    
        } catch (error) {
            console.error("Password Reset Failed:", error);
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            checkUser,
            register,
            login,
            logout,
            requestVerifyOtp,
            verifyEmail,
            requestResetPassword,
            resetPassword
            }}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthContext, AuthProvider };