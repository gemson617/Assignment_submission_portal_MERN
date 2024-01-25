import React, { useState, useEffect, useRef, useReducer } from "react";
import "../index.css";
import sideImage from '../assets/AssignmentPic.jpg'; // Path to your local image
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function EditAssignment() {

	const navigate = useNavigate();

    const imageUrl = 'https://source.unsplash.com/Mv9hjnEUHR4/600x800';

    const {id } = useParams();
	
	const [assignmentName, setAssignmentName] = useState('');
	const [description, setDescription] = useState('');
	const [classValue, setClass] = useState('');
	const [section, setSection] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [notes, setNotes] = useState('');
  
    const handleAssignmentName = (event) => {
      setAssignmentName(event.target.value);
    };

	const handleDescription = (event) => {
		setDescription(event.target.value);
		// console.log(description)
	  };

	const handleClass = (event) => {
	setClass(event.target.value);
	};

	const handleSection = (event) => {
	setSection(event.target.value);
	};
  
    const handleDueDate = (event) => {
      setDueDate(event.target.value);
    };

	const handleNotes = (event) => {
		setNotes(event.target.value);
	  };
    

	//update the assignment
    const handleAsssign = async () => {
  
      try {

		const formData = new FormData();
		formData.append('id', id);
		formData.append('name', assignmentName);
		formData.append('description', description);
		formData.append('classes', classValue);
		formData.append('section', section);
		formData.append('dueDate', dueDate);
		formData.append('notes', notes);
		
        const response = await axios.put('http://localhost:5000/admin/editAssignment', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
		if(response.data.success){
			alert('Assignment Updated Succesfully!')
			navigate('/viewAssignmentsAdmin');
			window.location.reload()

			
		}
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };


    //get assignments to edit
    const getAssignments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/admin/getAssignmentsById/${id}`, );
            const assignment =  response.data.data

            setAssignmentName(assignment.name)
            setDescription(assignment.description)
            setClass(assignment.classes)
            setSection(assignment.section)
            setDueDate(assignment.dueDate)
            setNotes(assignment.notes)

            } catch (error) {
            console.error('Error uploading file:', error);
            }
    }


    useEffect(()=>{
       getAssignments()
    },[])













    const divStyle = {
    //   width: '100%',
    //   height: 'auto',
      backgroundColor: '#ccc', // Fallback color if the image fails to load
      backgroundImage: `url(${sideImage})`,
      backgroundSize: 'cover',
      // Add more styles as needed
    };
  return (
    <div>
        

<div class="h-full bg-gray-400 dark:bg-gray-900">
	{/* <!-- Container --> */}
	<div class="mx-auto">
		<div class="flex justify-center px-6 py-12">
			{/* <!-- Row --> */}
			<div class="w-full lg:w-full flex">
				{/* <!-- Col --> */}
                <div className="hidden object-cover w-full h-auto rounded-l-lg rounded-r-none md:block" style={divStyle}></div>

				{/* <!-- Col --> */}
				<div class="w-full bg-indigo-500 dark:bg-gray-700 p-5 rounded-lg md:rounded-l-none">
					<h3 class="py-2 text-4xl text-center text-gray-100 dark:text-white">Assign Assignment!</h3>
					<form class="px-2 pt-6 pb-8 mb-4 bg-indigo-500 dark:bg-gray-800 rounded">
							<div class="mb-4 md:mb-0 w-full">
								<label class="block mb-2 text-xl  text-gray-100 dark:text-white" for="firstName">
                                    Assignment Name
                                </label>
								<input
									type="email" onChange={handleAssignmentName} value={assignmentName}
									class="w-full rounded-md focus:shadow-3xl border-gray-200 p-2 px-2 pe-12 text-md shadow-sm"/>
							</div>
							<div class="mt-2 w-full" >
								<label class="block mb-2 text-lg text-gray-100 dark:text-white" for="lastName">
								Assignment Description
                                </label>
								<input
									type="text" onChange={handleDescription} value={description}
									class="w-full rounded-md focus:shadow-3xl border-gray-200 p-2 px-2 pe-12 text-md shadow-sm"/>
							</div>
							<div class="mb-4 md:flex md:justify-between mt-2">
							<div class="mb-4 md:mb-0 w-full md:mr-2">
								<label class="block mb-2 text-xl  text-gray-100 dark:text-white" for="firstName">
                                    Class
                                </label>			
									<select id="countries" onChange={handleClass} class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
										<option >Choose a Class</option>
                                        <option value="8"  selected={classValue === '8'}>8th</option>
										<option value="9"  selected={classValue === '9'}>9th</option>
										<option value="10" selected={classValue === '10'}>10th</option>
										<option value="11" selected={classValue === '11'}>11th</option>
										<option value="12" selected={classValue === '12'}>12th</option>
									</select>

									
							</div>
							<div class=" w-full">
								<label class="block mb-2 text-lg text-gray-100 dark:text-white" for="lastName">
								Section
                                </label>
								<select id="countries" onChange={handleSection} class="bg-gray-50 border font-sans border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
										<option selected>Choose a Section</option>
										<option value="all" selected={section === 'all'}>All</option>
										<option value="a"   selected={section === 'a'}>A</option>
										<option value="b"   selected={section === 'b'}>B</option>
										<option value="c"   selected={section === 'c'}>C</option>
										<option value="d"   selected={section === 'd'}>D</option>
										<option value="e"   selected={section === 'e'}>E</option>
									</select>
							</div>
						</div>
		
						<div class="mb-4 md:flex md:justify-between">
							<div class="mb-4 md:mr-2 md:mb-0 w-full">
								<label class="block mb-2 text-lg text-gray-100 dark:text-white" for="password">
                                    Due Date
                                </label>
								<input type="date" onChange={handleDueDate} value={dueDate}
									class="w-full rounded-md focus:shadow-3xl border-gray-200 p-2 px-2 pe-12 text-md shadow-sm"/>
								{/* <p class="text-xs italic text-red-500">Please choose a password.</p> */}
							</div>
							<div class="md:ml-2 w-full">
								<label class="block mb-2 text-lg text-gray-100 dark:text-white" for="c_password">
                                    Notes
                                </label>
									<input type="text" onChange={handleNotes} value={notes}
									class="w-full rounded-md focus:shadow-3xl border-gray-200 p-2 px-2 pe-12 text-md shadow-sm" />
							</div>
						</div>
						
						<div class="text-center">
							<button onClick={handleAsssign}
                                class="w-full px-4 py-2 font-bold text-white bg-slate-950 rounded-full hover:bg-slate-900 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                type="button">
                                Submit
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

export default EditAssignment
