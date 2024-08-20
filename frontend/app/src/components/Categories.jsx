import { Link } from 'react-router-dom';
import Category from './Category';
import { useContext } from 'react';
import { ServiceContext } from '../contexts/ServiceContext';
import Loading from './Loading';


function Categories() {
    const { services } = useContext(ServiceContext)

    if (!services) {
        return (
            <Loading/>
        )
    }

    return (
        <div className='p-2 mb-20'>
            <h1 className='font-bold text-2xl mb-4 flex justify-center'>Service Categories</h1>
            <div className='flex flex-row flex-wrap gap-10 items-center justify-center'>
                {
                    services.map(({id, name, description}) => (
                        <Link to={`/providers?serviceId=${id}`}>
                        <Category key={id} title={name} description={description}/>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}
export default Categories;