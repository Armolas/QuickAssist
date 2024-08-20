import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'
import { ServiceContext } from '../contexts/ServiceContext'

function Header() {
	const location = useLocation();
	const path = location.pathname;
	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const {isAuthenticated, logout, user} = useContext(AuthContext);
	const { services, getServices } = useContext(ServiceContext)

	console.log(services)

	const handleLogout = () => {
		logout()
	}
	const toggleDropdown = () => {
		setDropdownOpen(!isDropdownOpen);
	}

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
		  setDropdownOpen(false);
		}
	  };
	
	useEffect(() => {
		if (isDropdownOpen) {
		  document.addEventListener('mousedown', handleClickOutside);
		} else {
		  document.removeEventListener('mousedown', handleClickOutside);
		}
	
		// Cleanup event listener on component unmount
		return () => {
		  document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownOpen]);

  return (
    <header className="flex flex-row h-14 space-x-4 bg-violet-300 shadow-2xl w-full top-0">
		<div className="basis-1/4 flex justify-items-start items-center pl-4">
		<Link to="/">
    		<h3 className="font-bold">QuickAssist</h3>
		</Link>
		</div>
		<div className="basis-1/2 flex items-center justify-center">
    		<ul className="flex flex-row space-x-5">
   				<Link to="/" className={`${path === '/' ? "font-bold text-violet-950" : ""}`}>Home</Link>
				<Link to="/about" className={`${path === '/about' ? "font-bold text-violet-950" : ""}`}>About</Link>
				<li>
					<div className='flex justify-end items-center relative' ref={dropdownRef}>
						<button type='button' onClick={toggleDropdown}>
							<span className={`${isDropdownOpen ? "font-bold text-violet-950" : ""}`}>Services</span>
						</button>
						{
							isDropdownOpen && (
								<div className="absolute self-baseline mt-10 w-40 bg-violet-50 border rounded shadow-lg">
									{
									services.map(({id, name}) => (
										<Link key={id} to={`/providers?serviceId=${id}`} className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={()=>setDropdownOpen(false)}>{name}</Link>
									))
									}
								</div>
							)
						}
					</div>
				</li>
				{
					isAuthenticated ? (
						<>
						<Link to="/dashboard" className={`${path === '/dashboard' ? "font-bold text-violet-950" : ""}`}>Dashboard</Link>
						<button onClick={handleLogout}>Logout</button>
						</>
					):
					<Link to="/login" className={`${path === '/login' ? "font-bold text-violet-950" : ""}`}>Sign In</Link>
				}
			</ul>
		</div>
		<div className="basis-1/4 flex items-center justify-end pr-4">
			<FontAwesomeIcon icon={faMagnifyingGlass} className='mr-1' />
			<input className="border border-black rounded-xl pl-2" placeholder={`Search for a ${path === '/providers' ? 'provider' : 'service'}...`} role='search'></input>
		</div>
    </header>
	)
}
export default Header
