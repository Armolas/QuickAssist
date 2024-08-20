import ServiceProvider from "./ServiceProvider";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const serviceProviders = [
    {
        "id": "c91be7c2-bea4-4233-ae3e-7e12f438532a",
        "firstName": "Aisha",
        "lastName": "Oladimeji",
        "address": "12 Ikoyi Crescent, Lagos",
        "about": "5 years of experience in professional house cleaning.",
        "skills": ["House Cleaning", "Laundry"],
        "gender": "Female",
        "chargePerHour": 2000,
        "rating": 4
    },
    {
        "id": "06728532-c63f-4638-bee6-9901a9b5eb7a",
        "firstName": "John",
        "lastName": "Nwosu",
        "address": "15 Victoria Island, Lagos",
        "about": "Expert market shopper with over 7 years of experience.",
        "skills": ["Market Shopping", "Cooking"],
        "gender": "Male",
        "chargePerHour": 2500,
        "rating": 5
    },
    {
        "id": "06728532-c63f-4638-bee6-9901a9b5eb7a",
        "firstName": "Fatima",
        "lastName": "Bello",
        "address": "22 Lekki Phase 1, Lagos",
        "about": "Reliable and caring babysitter with 4 years of experience.",
        "skills": ["Baby Sitting", "House Cleaning"],
        "gender": "Female",
        "chargePerHour": 1500,
        "rating": 4
    },
    {
        "about": "A very calm individual who loves kids with 7 years experience in baby sitting",
        "address": "32, Johnson Boulevard, Ikoyi, Lagos",
        "age": 24,
        "chargePerHour": 2450,
        "created_at": "Wed, 14 Aug 2024 15:25:31 GMT",
        "email": "muritadhorprovider@gmail.com",
        "firstName": "Muritadhor",
        "gender": "Male",
        "id": "8cadf54e-ec4a-4dbf-bcfa-70bd6182b183",
        "lastLogin": "Wed, 14 Aug 2024 15:25:31 GMT",
        "lastName": "Arowolo",
        "phoneNumber": "08012345678",
        "rating": 5,
        "skills": [
            "Baby Sitting",
            "Cooking"
        ],
        "type": "provider",
        "updated_at": "Wed, 14 Aug 2024 15:25:31 GMT"
    }
]
function FeaturedServiceProviders() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
      };
    return (
        <div className='p-1.5 mb-20 overflow-hidden'>
            <h1 className='font-bold text-2xl mb-4 p-1 flex justify-center'>Featured Service Providers</h1>
            <Slider {...settings}>
            {
                serviceProviders.map(({id, firstName, lastName, about, rating, chargePerHour}) =>
                    <div key={id} className="">
                    <ServiceProvider id={id} firstName={firstName} lastName={lastName} chargePerHour={chargePerHour} description={about} rating={rating}/>
                    </div>
                )
            }
            </Slider>
        </div>
    )
}
export default FeaturedServiceProviders