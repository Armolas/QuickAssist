import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram, faLinkedin  } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <div className='bg-violet-300 flex flex-row h-28 justify-between p-3 w-full bottom-0'>
            <div className='flex flex-col justify-center'>
                <h3 className='font-semibold'>Quick Links</h3>
                <ul className='flex flex-col'>
                    <li>Privacy Policy</li>
                    <li>Terms of Service</li>
                </ul>
            </div>
            <div className='flex flex-col justify-center'>
                <h3 className='font-semibold mb-2 self-center'>Follow Us</h3>
                <div className='flex space-x-2 self-center'>
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
                <p className='mt-2 text-sm self-end'>&copy; QuickAssist, 2024</p>
            </div>
            <div className='flex flex-col justify-center'>
                <h3 className='font-semibold'>Contact Us</h3>
                <ul className='flex flex-col'>
                    <li><a href="mailto:armolas06@gmail.com">Email: support@quickassist.com</a></li>
                    <li><a href="tel:+2349017529737">Phone: +2349017529737</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Footer