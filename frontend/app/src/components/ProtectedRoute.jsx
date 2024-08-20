import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

function ProtectedRoute({component: Component}) {
    const { isAuthenticated, user, requestVerifyOtp } = useContext(AuthContext);
    const hasNotified = useRef(false);
    const [otpRequested, setOtpRequested] = useState(false);

    useEffect(() => {
        if (!isAuthenticated && !hasNotified.current) {
            toast.error("Please login or register to access services!", {
                position: "top-right",
                autoClose: 2000,
            });
        }
        hasNotified.current = true
    }, [isAuthenticated]);

    useEffect(() => {
        const handleOtpRequest = async () => {
          if (isAuthenticated && !user.is_verified && !otpRequested) {
            try {
              await requestVerifyOtp(user.email);
              toast.success("Verification email sent! Please check your inbox.", {
                position: "top-right",
                autoClose: 2000,
              });
              setOtpRequested(true);
            } catch (error) {
              toast.error("Failed to send verification email. Please try again.", {
                position: "top-right",
                autoClose: 2000,
              });
            }
          }
        };
    
        handleOtpRequest();
      }, [isAuthenticated, user, requestVerifyOtp, otpRequested]);
    

    if (isAuthenticated) {
        if (user.is_verified) {
            return <Component />;
        } else {
            return <Navigate to="/verify-email" replace />;
        }
    } else {
        return <Navigate to="/login" replace />;
    }
    
}

export default ProtectedRoute