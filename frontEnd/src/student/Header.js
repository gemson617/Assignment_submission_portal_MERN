import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux'
import {  setLogoutAlert } from './states/ErrorSlice';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() =>{
    localStorage.removeItem('token');

    navigate('/');


    await dispatch(setLogoutAlert())

    const timeoutId = setTimeout(() => {
        dispatch(setLogoutAlert())
      }, 3000);
        return () => clearTimeout(timeoutId);
  }


  const goHome  = async() =>{

    navigate('/studentHome');
  }

  
  return (
<header class="header sticky top-0 bg-slate-950 text-white shadow-md flex items-center justify-between px-8">
    {/* <!-- logo --> */}
    
    <h1 class="py-5 text-2xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-4xl duration-200 cursor-pointer hover:text-green-500">
        Assignment Submission Portal
    </h1>

    {/* <!-- navigation --> */}
    <nav class="nav font-semibold text-lg">
        <ul class="flex items-center">
            <li class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              <a href="/editProfile">My Profile</a>
            </li>
            <li class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <a href="#" onClick={handleLogout}>Logout</a>
            </li> 
        </ul>
    </nav>

   
</header>



  )
}

export default Header