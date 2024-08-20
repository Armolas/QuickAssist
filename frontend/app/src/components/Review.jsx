import StarRating from "./Rating";

function Review({review, stars}){
    return (
    <div className="bg-violet-50 p-3 rounded-lg mt-3">
        <p className="text-gray-500">"{review}"</p>
        <StarRating className="flex p-2" totalStars={stars}/>
    </div>
    )
}
export default Review