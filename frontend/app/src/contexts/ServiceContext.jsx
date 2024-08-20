import { createContext, useState, useEffect } from 'react';

const ServiceContext = createContext()

function ServiceProvider({children}) {
    const [services, setServices] = useState([])
    const [service, setService] = useState(null)

    async function getProviders(serviceId) {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/services/${serviceId}/providers`)

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData.error);
                return;
            }
            const data = await response.json();
            const serviceProviders = data.data;
            setService(data.service);
            return serviceProviders;
        } catch (error) {
            console.error("request failed:", error);
        }
    }

    async function getServices() {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/services`)

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Error:", errorData.error);
                return;
            }
            const data = await response.json();
            const serviceList = data.data;
            setServices(serviceList)
        } catch (error) {
            console.error("request failed:", error);
        }
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <ServiceContext.Provider value={{ getProviders, services, service, getServices }}>
            {children}
        </ServiceContext.Provider>
    );
}
export { ServiceContext, ServiceProvider };