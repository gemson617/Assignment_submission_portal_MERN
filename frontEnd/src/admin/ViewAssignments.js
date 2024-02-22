import React, {useEffect, useState} from 'react'
import Header from "../student/Header";
import axios from "axios";
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
function ViewAssignments() {

  const [assignments, setAssignments] = useState([]);
  const [classes, setClass] = useState('all');
	const [section, setSection] = useState('all');

  const handleClass = (event) => {
    setClass(event.target.value);
    };
  
  const handleSection = (event) => {
    setSection(event.target.value);
    };

    const handleFilter = async () => {
           
      try {
        const response = await axios.get('http://localhost:5000/admin/getAssignments', {
          params: {
            classes: classes,
            section: section
          }
        });
        const data =  response.data.data
            setAssignments();
            setAssignments(data);
		if(response.data.success){
			alert('Assignment Created Succesfully!')
			window.location.reload()
		}
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };
    
  
      useEffect(() => {
          handleFilter();
      }, []);


  return (
    <div>
        <Header/>
          <section className="py-10 text-white bg-slate-950 md:h-full ">
            <div className='flex justify-end mx-4'>
                <div class="mb-4 md:mb-0 w-full md:w-44 mr-2">
                      <label class="block mb-2 text-xl  text-gray-100 dark:text-white" for="firstName">
                                          Class
                                      </label>			
                        <select id="countries" onChange={handleClass} class="bg-gray-50 border border-purple-900 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  pl-3 mr-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="all" selected>All</option>
                          <option value="8"> 8th</option>
                          <option value="9"> 9th</option>
                          <option value="10">10th</option>
                          <option value="11">11th</option>
                          <option value="12">12th</option>
                        </select>

                        
                    </div>
                    <div class=" w-full md:w-44 ">
                      <label class="block mb-2 text-lg text-gray-100 dark:text-white" for="lastName">
                      Section
                                      </label>
                      <select id="countries" onChange={handleSection} class="bg-gray-50 border font-sans border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1  pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="all" selected>All</option>
                          <option value="a">A</option>
                          <option value="b">B</option>
                          <option value="c">C</option>
                          <option value="d">D</option>
                          <option value="e">E</option>
                        </select>
                    </div>
                    <div>
                    <button onClick={handleFilter}
                                class="w-full mt-9 ml-2 px-4 py-1 font-semibold text-slate-900 bg-slate-200 rounded-full hover:bg-green-500 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                type="button">
                                Filter
                            </button>
                    </div>
              </div>
  <div className="px-4 py-4">
   
      <table class=" rounded-lg min-w-full border border-gray-300">
          <thead className='bg-indigo-500 '>
            <tr>
              <th class="py-2 px-4 border-b">S.No</th>
              <th class="py-2 px-4  border-b">Assignment Name</th>
              <th class="py-2 px-4  border-b">Description</th>
              <th class="py-2 px-4  border-b">Class</th>
              <th class="py-2 px-4  border-b">Section</th>
              <th class="py-2 px-4  border-b">Due Date</th>
              <th class="py-2 px-4  border-b">Action</th>
            </tr>
          </thead>
          <tbody>

            {assignments.map((assignment, index) => {
              // Parse the original date string
              const originalDate = new Date(assignment.dueDate);

              // Get the date in the desired format (YYYY-MM-DD)
              const formattedDueDate = originalDate.toLocaleDateString('en-GB'); // 'en-GB' represents the format 'dd-mm-yyyy'

              return (
                <tr className='text-center hover:bg-slate-900' key={index}>
                  <td class="py-2 px-4 border-b ">{index + 1}</td>
                  <td class="py-2 px-4 border-b">{assignment.name}</td>
                  <td class="py-2 px-4 border-b">{assignment.description}</td>
                  <td class="py-2 px-4 border-b">{assignment.classes}</td>
                  <td class="py-2 px-4 border-b">{assignment.section}</td>
                  <td class="py-2 px-4 border-b">{formattedDueDate}</td>
                  <td class="py-2 px-4 border-b">
                    <Link to={`editAssignment/${assignment._id}`}>
                    <EditIcon  className='text-green-500' style={{fontSize:'22px',padding:'0px'}}/>
                    </Link>
                  </td>
                </tr>
              );
            })}

            
          </tbody>
    </table>

  </div>
</section>
    </div>
  )
}

export default ViewAssignments