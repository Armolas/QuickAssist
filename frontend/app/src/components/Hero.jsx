import { Link } from 'react-router-dom';
import Button from './Button';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'

function Hero(){
    const { isAuthenticated } = useContext(AuthContext)
    return (
        <div className="mt-10 flex flex-col gap-y-6 items-center justify-center mb-10">
            <h1 className="font-semibold text-3xl">Find the Best Services Near You</h1>
            <p>Connecting you with trusted helpers...</p>
            {
                (!isAuthenticated) && (
                    <div className="flex flex-row gap-x-8">
                        <Link to='/signup'>
                        <Button color='bg-violet-300 p-2' text="Find Help"/>
                        </Link>
                        <Link to='/signup?user=provider'>
                        <Button color='bg-violet-300 p-2' text='Become a Provider'/>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}
export default Hero;