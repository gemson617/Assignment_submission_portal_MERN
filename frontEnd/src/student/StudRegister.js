import { React, useEffect, useState, useRef } from 'react'
import "../index.css";
import sideImage from '../assets/AssignmentPic.jpg'; // Path to your local image
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { handleApiError } from './ApiUtils';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';






const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function StudRegister() {
    const [studClass, setClass] = useState('');
    const [studSection, setSection] = useState('');
    const [file, setFile] = useState(null);

    const [student, setStudent] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const imageUrl = 'https://source.unsplash.com/Mv9hjnEUHR4/600x800';

    const handleChangeClass = (event) => {
        setClass(event.target.value);
    };

    const handleChangeSection = (event) => {
        setSection(event.target.value);
    };

    
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
    } = useForm()

    const divStyle = {
        //   width: '100%',
        //   height: 'auto',
        backgroundColor: '#ccc', // Fallback color if the image fails to load
        backgroundImage: `url(${sideImage})`,
        backgroundSize: 'cover',
        // Add more styles as needed
    };

    const classes = [
        { class: '8 th' },
        { class: '9 th' },
        { class: '10 th' },
        { class: '11 th' },
        { class: '12 th' },
    ]

    const sections = [
        { class: 'A' },
        { class: 'B' },
        { class: 'C' },
        { class: 'D' },
    ]


    
    
    

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const [showCPassword, setShowCPassword] = useState(false);

    const toggleCPasswordVisibility = () => {
        setShowCPassword(!showCPassword);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    };


    const getStudent = async (setStudent, navigate, dispatch) => {

        const token = localStorage.getItem('token'); // Assuming token is stored in local storage

        try {
            const response = await axios.get(`http://localhost:5000/login/getStudent`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const student = response.data.student
            setStudent(student)
        } catch (error) {
            handleApiError(error, navigate, dispatch);
        }
    };

    useEffect(() => {
        getStudent(setStudent, navigate, dispatch);
    }, []);


    const password = useRef({});
    password.current = watch("password", "");


    const onSubmit = async (data) => {

        // data.file = file;
        student.file = file
        console.log(student)
        try {
            const response = await axios.post('http://localhost:5000/login/updateStudent', data, {
            });


            if (response.data.success) {
                alert(response.data.msg);

                window.location.reload()
            }
        } catch (error) {
            console.log('update error : ' + error);
        }
    }

    return (
        <div>


            <div class="bg-gray-400 dark:bg-gray-900">
                {/* <!-- Container --> */}
                <div class="mx-auto">
                    <div class="flex justify-center px-6 py-12">
                        {/* <!-- Row --> */}
                        <div class="w-full lg:w-10/12 flex">
                            {/* <!-- Col --> */}
                            <div className="hidden object-cover w-full h-auto rounded-l-lg rounded-r-none lg:block " style={divStyle}></div>

                            {/* <!-- Col --> */}
                            <div class="w-full bg-indigo-500 dark:bg-gray-800 p-5 rounded-lg md:rounded-l-none">
                                <h3 class="py-4 text-3xl text-center text-gray-900 tracking-[.25em] dark:text-white">Edit Profile</h3>


                                <form class="px-2 pt-6 pb-8 mb-4 bg-indigo-500 dark:bg-gray-800 rounded" onSubmit={handleSubmit(onSubmit)} >
                                    <div class="mb-4 md:flex md:justify-between mt-2">
                                        <div class="mb-4 md:mb-0 w-full md:mr-2">
                                            <label class="block mb-2 text-xl  text-gray-100 dark:text-white" for="firstName">
                                                First Name <span className="text-red-700"> *</span>
                                            </label>
                                            <input
                                                class="w-full px-3 py-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="firstName"  {...register("first_name", { required: 'First Name is Required' })}
                                                type="text" value={student.first_name} onChange={handleInputChange}
                                                placeholder="First Name"
                                            />
                                            {errors?.first_name && <b role="alert" className="text-sm italic text-slate-900">{errors?.first_name.message}</b>}
                                        </div>
                                        <div class="w-full" >
                                            <label class="block mb-2 text-lg text-gray-100 dark:text-white" for="lastName">
                                                Last Name
                                            </label>
                                            <input
                                                class="w-full px-3 py-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="lastName"  {...register("last_name")}
                                                type="text" value={student.last_name} onChange={handleInputChange}
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>

                                    <div class="mb-4 w-full mt-2">
                                        {/* <div class="w-full md:mr-2" >
                                        
                                        <label class="block mb-2 text-xl  text-gray-100 dark:text-white" for="firstName">
                                        Profile Pic <span className="text-red-700"> *</span>
                                            </label>
                                            <div class="relative bg-white p-0.5">
                                                <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} className='w-full'>
                                                    {file ? file.name : 'Upload Image'}
                                                    <VisuallyHiddenInput type="file" name='file' {...register("file", { required: 'Attachment is Required' })} onChange={handleFileChange} />
                                                </Button>
                                            </div>
                                            {errors?.file && <b role="alert" className="text-sm italic text-slate-900">{errors?.file.message}</b>}

                                        </div> */}
                                        <div class="mb-4 md:mb-0 w-full ">
                                            <label class="block text-xl mb-2 text-gray-100 dark:text-white" for="firstName">
                                                Email <span className="text-red-700"> *</span>
                                            </label>
                                            <input {...register("email", { required: 'Email is Required' })}
                                                class="w-full px-3 py-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                id="email" value={student.email} onChange={handleInputChange}
                                                type="email"
                                                placeholder="Email"
                                            />
                                            {errors?.email && <b role="alert" className="text-sm italic text-slate-900">{errors?.email.message}</b>}
                                        </div>
                                    </div>

                                    <div class="mb-4 md:flex md:justify-between mt-2">

                                        <div class="w-full md:mr-2">
                                            <label class="block mb-2 text-lg text-gray-100 dark:text-white" for="lastName">
                                                Password  
                                            </label>
                                            <div className='relative'>
                                                <input {...register("password")}
                                                    class="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="password" onChange={handleInputChange}
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="**********"
                                                />
                                                {errors?.password && <b role="alert" className="text-sm italic text-slate-900">{errors?.password.message}</b>}
                                                <span class="absolute inset-y-0 end-0 grid place-content-center px-4 mb-3">
                                                    <p className='cursor-pointer hover:text-green-600' onClick={togglePasswordVisibility}>
                                                        {showPassword ? <VisibilityOffIcon style={{ fontSize: '17px', padding: '0px' }} /> : <RemoveRedEyeIcon style={{ fontSize: '17px', padding: '0px' }} />}
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="mb-4 md:mb-0 w-full">
                                            <label class="block mb-2 text-lg text-gray-100 dark:text-white" for="password">
                                                confirm Password  
                                            </label>
                                            <div className='relative'>
                                                <input
                                                    class="w-full px-3 py-3 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                                    id="c_password" {...register("c_password", { validate: value => value === password.current || "Passwords do not match" })}
                                                    type={showCPassword ? 'text' : 'password'}
                                                    onChange={handleInputChange}
                                                    placeholder="**********"
                                                />
                                                <span class="absolute inset-y-0 end-0 grid place-content-center px-4 mb-3">
                                                    <p className='cursor-pointer hover:text-green-600' onClick={toggleCPasswordVisibility}>
                                                        {showCPassword ? <VisibilityOffIcon style={{ fontSize: '17px', padding: '0px' }} /> : <RemoveRedEyeIcon style={{ fontSize: '17px', padding: '0px' }} />}

                                                    </p>
                                                </span>
                                            </div>
                                            {errors?.c_password && <b role="alert" className="text-sm italic text-slate-900">{errors?.c_password.message}</b>}


                                        </div>

                                    </div>

                                    {/* <div class="mb-4 md:flex md:justify-between">

                                    </div> */}
                                    {/* onClick={handleAsssign} */}
                                    <div class="text-center">
                                        <button type='submit'
                                            class="tracking-[.25em] w-full px-4 py-2 font-bold text-white bg-slate-950 rounded-full hover:bg-slate-900 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                        >
                                            Update Profile
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudRegister