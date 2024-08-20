import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedServiceProviders from "../components/FeaturedServiceProviders";
import FeaturedReviews from "../components/FeaturedReviews";

function Home() {
    return (
        <>
            <Hero/>
            <Categories/>
            <FeaturedServiceProviders/>
            <FeaturedReviews/>
        </>
    )
}
export default Home