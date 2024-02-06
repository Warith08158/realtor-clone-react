import React from 'react'
import { useLocation, useNavigate } from 'react-router'

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname)

  function pathMathRoute(route){
    if(route === location.pathname){
        return true;
    }
  }


  return (
    <div className='bg-white border-b shadow-sm sticky left-0 top-0 z-10'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            {/* logo div starts here */}
            <div>
                <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="logo" className='h-5 cursor-pointer' onClick={() => navigate('/')} />
            </div>
            {/* logo div ends here */}


            {/* menu div  starts here*/}
            <div>
                <ul className='flex items-center space-x-10'>
                    <li onClick={() => navigate('/')} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMathRoute('/') && "text-gray-600 border-b-red-500 border-b-[3px]"}`}>Home</li>

                    <li onClick={() => navigate('/offers')} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMathRoute('/offers') && "text-gray-600 border-b-red-500 border-b-[3px]"}`}>Offers</li>
                    
                    <li onClick={() => navigate('/sign-in')} className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 ${pathMathRoute('/sign-in') && "text-gray-600 border-b-red-500 border-b-[3px]"}`}>Sign In</li>
                </ul>
            </div>
            {/* menu div  ends here*/}
        </header>
    </div>
  )
}
