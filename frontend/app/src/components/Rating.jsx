import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function StarRating({ className, totalStars = 5 }) {
  return (
    <div className={ className ? `${className}` : `flex flex-row justify-center`}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={`cursor-pointer h-4 w-4 ${
              starValue <= totalStars ? 'text-yellow-500' : 'text-gray-400'
            }`}
          />
        )
      })}
    </div>
  )
}
export default StarRating;