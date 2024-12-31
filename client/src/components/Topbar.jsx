// import React,{useState} from 'react'
// import Signup from './Signup'
// import Login from './Login';
// const Topbar = (props) => {
//     const [activeTab, setActiveTab] = useState(props);
//     const handleSignupClick = ()=>{
//         props = '/signup'
//         setActiveTab('/signup')
//     }
//     const handleLoginClick = ()=>{
//         props = '/login'
//         setActiveTab('/login')
//     }
//     return (
        // <div className='min-h-full'>
        //     <div className='flex flex-col items-center justify-center lg:py-2 py-0 bg-gray-700'>
        //         <section className="bg-gray-80 min-h-screen flex items-center justify-center">
        //             <div className='bg-gray-800 flex rounded-2xl shadow-lg max-w-full lg:py-4 lg:px-0 py-8 items-center h-auto md:w-[70%] w-[97vw]'>
        //                 <div className=' md:px-16 px-5'>
        //                     <div className='flex flex-row'>
        //                         <h2 className={`font-bold text-2xl w-1/2 text-center cursor-pointer ${( activeTab === '/signup') ? 'text-purple-600' : 'text-purple-400'}`} onClick={handleSignupClick}>SignUp</h2>
                                
        //                         <div className='border border-purple-700'></div>
        //                         <h2 className={`font-bold text-2xl w-1/2 text-center cursor-pointer ${( activeTab === '/login') ? 'text-purple-600' : 'text-purple-400'}`} onClick={handleLoginClick}>LogIn</h2>
        //                     </div>
                            
        //                     <div className='w-full'>
        //                         {activeTab === '/signup' ? <Signup /> : <Login />}
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>
        //     </div >
        // </div >
//     )
// }

// export default Topbar


import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import Signup from './Signup';
import Login from './Login';

const Topbar = (props) => {
  const navigate = useNavigate();  // Hook to navigate programmatically
  const location = useLocation();  // Hook to access current URL location
  const [activeTab, setActiveTab] = useState(props.message);  
    // console.log('props:', props)
    // console.log('location.pathname:', location.pathname)
    // console.log('activeTab:', activeTab)

  const handleSignupClick = () => {
    location.pathname = '/signup'
    setActiveTab('/signup');
    navigate('/signup'); 
  };

  const handleLoginClick = () => {
    location.pathname = '/login'
    setActiveTab('/login');
    navigate('/login'); 
  };

  return (
    <div className='min-h-full'>
            <div className='flex flex-col items-center justify-center lg:py-2 py-0 bg-gray-700'>
                <section className="bg-gray-80 min-h-screen flex items-center justify-center">
                    <div className='bg-gray-800 flex rounded-2xl shadow-lg max-w-full lg:py-4 lg:px-0 py-8 items-center h-auto md:w-[70%] w-[97vw]'>
                        <div className=' md:px-16 px-5'>
                            <div className='flex flex-row'>
                                <h2 className={`font-bold text-2xl w-1/2 text-center cursor-pointer ${( activeTab === '/signup') ? 'text-purple-600' : 'text-purple-400'}`} onClick={handleSignupClick}>SignUp</h2>
                                
                                <div className='border border-purple-700'></div>
                                <h2 className={`font-bold text-2xl w-1/2 text-center cursor-pointer ${( activeTab === '/login') ? 'text-purple-600' : 'text-purple-400'}`} onClick={handleLoginClick}>LogIn</h2>
                            </div>
                            
                            <div className='w-full'>
                                {activeTab === '/signup' ? <Signup /> : <Login />}
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </div >
  );
};

export default Topbar;
