import StarRating from "./Rating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
    {
      "id": 1,
      "reviewText": "Excellent service! The house cleaning was thorough and well-organized. The cleaner was professional and respectful. Highly recommended!",
      "rating": 5
    },
    {
      "id": 2,
      "reviewText": "Very satisfied with the babysitting service. The sitter was friendly, punctual, and great with the kids. Will definitely use again.",
      "rating": 4.5
    },
    {
      "id": 3,
      "reviewText": "The market shopper did a fantastic job! Everything was bought as requested and delivered on time. Great experience overall.",
      "rating": 4.7
    },
    {
      "id": 4,
      "reviewText": "Fantastic cooking service! The meals were delicious and prepared just as we requested. The cook was also very professional and courteous.",
      "rating": 4.8
    },
    {
      "id": 5,
      "reviewText": "The laundry service was prompt and the clothes were cleaned perfectly. The staff was friendly and efficient. Highly recommend for busy people!",
      "rating": 4.6
    },
    {
      "id": 6,
      "reviewText": "Impressed with the speed and quality of the cleaning service. The staff arrived on time and did an excellent job. Will definitely book again.",
      "rating": 4.7
    },
    {
      "id": 7,
      "reviewText": "The service was fantastic! The cook made a delicious meal and even accommodated my dietary restrictions. Professional and friendly service.",
      "rating": 4.9
    },
    {
      "id": 8,
      "reviewText": "Great experience with the laundry service. Everything was returned in perfect condition and the turnaround time was impressive.",
      "rating": 4.5
    },
    {
      "id": 9,
      "reviewText": "The babysitter was exceptional! Very reliable and engaging with the children. We felt completely at ease knowing our kids were in good hands.",
      "rating": 4.8
    },
    {
      "id": 10,
      "reviewText": "The market shopping service exceeded my expectations. All items were bought with great attention to detail and delivered promptly.",
      "rating": 4.6
    }
  ];

  
  function FeaturedReviews() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
      };
    return (
        <div className='p-1.5 mb-20 overflow-hidden'>
            <h1 className='font-bold text-2xl mb-4 p-1 flex justify-center'>What Our Users are Saying...</h1>
            <Slider {...settings}>
            {
                reviews.map(({id, reviewText, rating}) =>
                    <div key={id}>
                        <div className="bg-violet-50 p-3 h-60 rounded-lg m-3 flex flex-col justify-center shadow-xl items-center">
                            <p className="text-gray-500 flex justify-center items-center text-center">"{reviewText}"</p>
                            <StarRating className="flex p-2 justify-center" totalStars={rating}/>
                        </div>
                    </div>
                )
            }
            </Slider>
        </div>
    )
}
export default FeaturedReviews