import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, faLinkedin  } from '@fortawesome/free-brands-svg-icons';
import MuritadhorImage from '../images/MM-dreymoe-C.jpg'

function About() {
    return (
        <div className='flex flex-col shadow-2xl justify-center items-center py-10 mt-10 mb-10 m-auto p-4 gap-7 w-2/3 bg-violet-50'>
            <div>
                <h2 className='font-bold text-lg flex justify-center mb-3'>Welcome To QuickAssist</h2>
                <p className='text-pretty px-10 text-center'>At Quick Assist, we believe that finding reliable help should be simple and stress-free. Our platform is designed to connect you with skilled service providers for all your everyday needs. Whether you're looking for a trustworthy house cleaner, a reliable market shopper, a caring babysitter, a talented cook, or a meticulous laundry service, we've got you covered</p>
            </div>
            <div>
                <h2 className='font-bold text-lg flex justify-center mb-3'>Our Mission</h2>
                <p className='text-pretty px-10 text-center'>Our mission is to make your life easier by offering a seamless and efficient way to access quality services. We understand that time is precious and that finding the right help can be challenging. That's why we've created a user-friendly platform where you can find and book trusted service providers with just a few clicks.</p>
            </div>
            <div>
                <h2 className='font-bold text-lg flex justify-center mb-3'>Why Choose Us?</h2>
                <ul className="list-disc text-pretty px-10 text-start space-y-2">
                    <li><span className='font-bold'>Trusted Providers:</span> We carefully vet all our service providers to ensure they meet our high standards of reliability and professionalism.</li>
                    <li><span className='font-bold'>Convenient Access:</span> Our platform is available 24/7, allowing you to find help whenever you need it.</li>
                    <li><span className='font-bold'>User-Friendly Interface:</span> Navigate our site with ease and find what you need quickly with our intuitive design.</li>
                </ul>
            </div>
            <div>
                <h2 className='font-bold text-lg flex justify-center mb-3'>Meet The Developer</h2>
                <div className='w-72 h-72 m-5 rounded-full '>
                <img src={MuritadhorImage} alt="Muritadhor Arowolo" className='flex justify-center h-full w-full rounded-full object-cover object-top' />
                </div>
                <h3 className='font-semibold flex justify-center'>Muritadhor Arowolo</h3>
                <h3 className='flex justify-center mb-3'>(Full-stack Software Engineer)</h3>
                <div className='flex space-x-2 justify-center'>
                    <a href="http://facebook.com/arowolomuritadhor" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="http://x.com/armolas_06" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} />
                    </a>
                    <a href="http://linkedin.com/in/arowolomuritadhor" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a href="http://instagram.com/armolas_06" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>
        </div>
    )
}
export default About