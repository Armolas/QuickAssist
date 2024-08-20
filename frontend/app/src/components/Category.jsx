import babysittingImage from '../images/babysitting.jpg';
import houseCleaningImage from '../images/housecleaning.jpg';
import marketShopperImage from '../images/marketshopping.jpg';
import cookingImage from '../images/cooking.jpg';
import laundryImage from '../images/laundry.jpg';

const imageMap = {
    "Baby Sitting": babysittingImage,
    "House Cleaning": houseCleaningImage,
    "Market Shopping": marketShopperImage,
    Cooking: cookingImage,
    Laundry: laundryImage
};

function Category({title, description}) {
    return (
        <div className="bg-violet-50 rounded-lg w-96 h-60 p-4 flex flex-col justify-end shadow-2xl">
            <div className="h-40 flex items-center justify-center overflow-hidden rounded-lg mb-4">
                <img src={imageMap[title]} alt="" className={`object-cover ${ title === "Baby Sitting" ? "object-top" : "object-center"} h-full w-full rounded-lg overflow-y-hidden`}/>
            </div>
            <div>
            <h1 className="font-bold text-xl mb-2">{ title }</h1>
            <p className="text-lg mb-2">{ description }</p>
            </div>
        </div>
    )
}
export default Category