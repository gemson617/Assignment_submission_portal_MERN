import { React, useState, useEffect } from 'react'
import "../index.css";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setTokenAlert, setLogoutAlert } from './states/ErrorSlice';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import sideImage from '../assets/bg2.jpg'; // Path to your local image



function Login() {

  const navigate = useNavigate();
  const [failedAlert, setFailedAlert] = useState(false);
  const tokenAlert = useSelector((state) => state.ErrorSlice.tokenAlert)
  const LogoutAlert = useSelector((state) => state.ErrorSlice.logoutAlert)
  // alert(LogoutAlert)
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const divStyle = {
 
    backgroundImage: `url(${sideImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };



  const onSubmit = async (data) => {

    try {
      const response = await axios.post('http://localhost:5000/login/studentLogin', data, {
      });


      if (response.data.success) {

        localStorage.setItem('token', response.data.token);

        navigate('/studentHome');

      } else {

        dispatch(setTokenAlert('Email or password is wrong'))

        const timeoutId = setTimeout(() => {
          dispatch(setTokenAlert())
        }, 3000);
        return () => clearTimeout(timeoutId);

      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }


  return (
    <div className='flex items-center h-screen' style={divStyle}>
      <div class="w-full mx-auto md:w-1/2 py-auto max-w-lg  bg-black rounded-xl p-3 mt-3">

        {LogoutAlert && (
          <div id='alertDiv' class="bg-green-100 d-none border-t-4 mx-auto border-green-500 rounded-b px-4 py-2 mb-5 shadow-md" role="alert">
            <div class="flex">
              <svg class="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
              <p class=" tracking-[.15rem] font-bold text-slate-900">Logged Out Successfully!</p>
            </div>
          </div>
        )
        }

        {tokenAlert && (
          <div id='alertDiv' class="bg-red-100 d-none border-t-4 mx-auto border-red-500 rounded-b text-red-900 px-4 py-2 mb-5 shadow-md" role="alert">
            <div class="flex">
              <svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
              <p class="font-bold">{tokenAlert}</p>
            </div>
          </div>
        )
        }


        <h1 class="text-center text-2xl font-bold text-white sm:text-3xl ">LogIn</h1>

        <form action="" class="mb-0 mt-2 space-y-4 rounded-lg  shadow-lg sm:p-6 lg:p-8" onSubmit={handleSubmit(onSubmit)}>

          <div>
            <label for="email" class="sr-only">Email</label>

            <div class="relative">
              <input {...register("email", { required: 'Email is Required' })}
                type="email"
                class="w-full rounded-lg border-gray-200 text-indigo-600  p-3 pe-12 text-sm shadow-sm"
                placeholder="Email"
              />
              {errors?.email && <b role="alert" className="text-xs italic text-red-500">{errors?.email.message}</b>}


              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label for="password" class="sr-only">Password</label>

            <div class="relative">
              <input {...register("password", { required: 'Password is Required' })}
                type={showPassword ? 'text' : 'password'}
                class="w-full rounded-lg border-gray-200 p-3 text-sm shadow-sm"
                placeholder="Password"
              />
              {errors?.password && <b role="alert" className="text-xs italic text-red-500">{errors?.password.message}</b>}

              <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                <p className='cursor-pointer hover:text-green-600' onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityOffIcon style={{ fontSize: '20px', padding: '0px' }} /> : <RemoveRedEyeIcon style={{ fontSize: '20px', padding: '0px' }} />}


                </p>
              </span>
            </div>
          </div>

          <button
            type="submit"
            class="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-medium text-white"
          >
            Sign in
          </button>

          <p class="text-center text-sm text-gray-500">
            No account?
            <a class="underline" href=""> Sign up</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login