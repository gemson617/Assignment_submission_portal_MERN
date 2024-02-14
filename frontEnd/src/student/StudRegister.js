import React from 'react'
import "../index.css";
import sideImage from '../assets/AssignmentPic.jpg'; // Path to your local image
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form";
import axios from 'axios';


function StudRegister() {
    const [studClass, setClass] = React.useState('');
    const [studSection, setSection] = React.useState('');

    const imageUrl = 'https://source.unsplash.com/Mv9hjnEUHR4/600x800';

    const handleChangeClass = (event) => {
        setClass(event.target.value);
      };

      const handleChangeSection = (event) => {
        setSection(event.target.value);
      };

      const {
		register,
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


    const onSubmit = async(data) => {
          console.log(data)
        try {
          const response = await axios.post('http://localhost:5000/login/updateStudent', data, {
          });

    
          if(response.data.success){
            alert(response.data.msg);
    
            window.location.reload()
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
    }
    
  return (
    <div>
        

<div class="h-full bg-gray-400 dark:bg-gray-900">
	{/* <!-- Container --> */}
	<div class="mx-auto">
		<div class="flex justify-center px-6 py-12">
			{/* <!-- Row --> */}
			<div class="w-full lg:w-10/12 flex">
				{/* <!-- Col --> */}
                <div className="hidden object-cover w-full h-auto rounded-l-lg rounded-r-none lg:block " style={divStyle}></div>

				{/* <!-- Col --> */}
				<div class="w-full bg-white dark:bg-gray-700 p-5 rounded-lg md:rounded-l-none">
					<h3 class="py-4 text-2xl text-center text-gray-800 dark:text-white">Register Here</h3>
					<form class="px-8 pt-6 pb-8 mb-4 bg-white dark:bg-gray-800 rounded" onSubmit={handleSubmit(onSubmit)}>
						<div class="mb-4 md:flex md:justify-between">
							<div class="mb-4  md:mb-0 w-full">
								<label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="firstName">
                                    First Name
                                </label>
								<input
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                />
							</div>
							<div class="md:ml-2 w-full ">
								<label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="lastName">
                                    Last Name
                                </label>
								<input
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                />
							</div>
						</div>

                        {/* <div class="mb-4 md:flex md:justify-between">
							<div class="mb-4  md:mb-0 w-full">
								<label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="firstName">
                                    Class
                                </label>

                            
                                    <FormControl variant="standard" className='w-full'>
                                        <InputLabel id="demo-simple-select-autowidth-label">Select Class</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={studClass}
                                        onChange={handleChangeClass}
                                        label="Select Class"
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={8}>8th</MenuItem>
                                        <MenuItem value={9}>9th</MenuItem>
                                        <MenuItem value={10}>10th</MenuItem>
                                        <MenuItem value={11}>11th</MenuItem>
                                        <MenuItem value={12}>12th</MenuItem>
                                        </Select>
                                    </FormControl>

							</div>
							<div class="md:ml-2 w-full ">
								<label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="lastName">
                                    Section
                                </label>
                              

                                    <FormControl variant="standard" className='w-full m-6'>
                                        <InputLabel id="demo-simple-select-autowidth-label">Select Section</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={studSection}
                                        onChange={handleChangeSection}
                                        label="Select Class"
                                        >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value='a'>A</MenuItem>
                                        <MenuItem value='b'>B</MenuItem>
                                        <MenuItem value='c'>C</MenuItem>
                                        </Select>
                                    </FormControl>
                                
					
							</div>
						</div> */}
                        
						<div class="mb-4">
							<label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="email">
                                Email
                            </label>
							<input {...register("email")} 
                                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
						</div>
						<div class="mb-4 md:flex md:justify-between">
							<div class="mb-4 md:mr-2 md:mb-0 w-full">
								<label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="password">
                                    Password
                                </label>
								<input {...register("password")} 
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                />
								{/* <p class="text-xs italic text-red-500">Please choose a password.</p> */}
							</div>
							<div class="md:ml-2  w-full">
								<label class="block mb-2 text-sm font-bold text-gray-700 dark:text-white" for="c_password">
                                    Confirm Password
                                </label>
								<input
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="c_password"
                                    type="password"
                                    placeholder="******************"
                                />
							</div>
						</div>
						<div class="mb-6 text-center">
							<button
                                class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Register Account
                            </button>
						</div>
						<hr class="mb-6 border-t" />
						<div class="text-center">
							<a class="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="#">
								Forgot Password?
							</a>
						</div>
						<div class="text-center">
							<a class="inline-block text-sm text-blue-500 dark:text-blue-500 align-baseline hover:text-blue-800"
								href="./index.html">
								Already have an account? Login!
							</a>
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