import { Link } from "react-router-dom"
import StarRating from "./Rating"
function ServiceProvider({id, firstName, lastName, description, rating, chargePerHour}) {
    return (
        <Link to={`/profile?id=${id}`}>
        <div className="bg-violet-50 rounded-md w-96 m-3 h-60 p-4 flex flex-col justify-around shadow-2xl">
            {/* <div className=" border-violet-900 h-24 w-20 bg-gray-200 flex justify-center rounded-full self-center"></div> */}
            <div>
            <div className="mb-2 flex justify-between">
            <h3 className="font-bold text-xl">{ firstName } {lastName}</h3>
            <h3 className="font-serif text-3xl">&#8358;{chargePerHour}<span className="text-sm font-thin text-gray-500">per hour</span></h3>
            </div>
            <p className="text-lg mb-2">{ description }</p>
            <StarRating totalStars={rating}/>
            </div>
        </div>
        </Link>
    )
}
export default ServiceProvider