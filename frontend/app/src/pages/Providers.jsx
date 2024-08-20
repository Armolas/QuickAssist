import ServiceProvider from "../components/ServiceProvider"
import { useLocation } from "react-router-dom"
import { ServiceContext } from '../contexts/ServiceContext'
import { useContext, useEffect, useState } from 'react';
import Loading from "../components/Loading";

function Providers() {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const serviceId = params.get("serviceId") || "All"
    const [providers, setProviders] = useState([])

    const { getProviders, service } = useContext(ServiceContext)

    useEffect(() => {
        const fetchProviders = async () => {
            const providers = await getProviders(serviceId);
            setProviders(providers)
        };

        fetchProviders();
    }, [serviceId, getProviders]);

    if (!service) {
        return (
        <Loading/>
        )
    }

    return (
        <div className='p-3 mb-20 mt-10'>
            <h1 className='font-bold text-2xl mb-10 p-1 flex justify-center'>{service} Service Providers</h1>
            <div className='flex flex-row flex-wrap gap-4 items-center justify-around'>
                {
                    providers.map(({id, firstName, lastName, about, rating, chargePerHour}) =>
                    <ServiceProvider key={id} id={id} firstName={firstName} lastName={lastName} chargePerHour={chargePerHour} description={about} rating={rating}/>)
                }
            </div>
        </div>
    )
}
export default Providers