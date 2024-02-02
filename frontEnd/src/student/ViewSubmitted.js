import React, {useEffect, useState} from 'react'
import Header from "../student/Header";
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DownloadIcon from '@mui/icons-material/Download';



function ViewSubmitted() {

  const [assignments, setAssignments] = useState([]);
  // const [assignmentId, setAssignmentId] = useState(null);
  const [classes, setClass] = useState('all');
	const [section, setSection] = useState('all');
  const [pdfData, setPdfData] = useState('');

  const handleClass = (event) => {
    setClass(event.target.value);
    };
  
  const handleSection = (event) => {
    setSection(event.target.value);
    };


      const fetchPdfData = async (assignmentId) => {
        alert(assignmentId)
        try {
          const response = await axios.get(`http://localhost:5000/student/getAssignmentPDF/${assignmentId}`);

          const responseData = response.data.data;

          if (responseData && responseData.attachment) {
            const data = responseData.attachment;
            setPdfData(data);
            // alert(pdfData)
            // handleDownload(data);
          } else {
            console.error('Error fetching PDF: Response data or attachment is null');
          }

        } catch (error) {
          console.error('Error fetching PDF:', error);
        }
      };

      useEffect(() => {

        if (pdfData !== '') {
          alert(pdfData);
          handleDownload(pdfData);
        }

      }, [pdfData]); 
  

         const handleViewAttachment = async (assignmentId) => {

          try {
            const response = await axios.get(`http://localhost:5000/student/getAssignmentPDF/${assignmentId}`);
  
            const responseData = response.data.data;
  
            if (responseData && responseData.attachment) {
              const data = responseData.attachment;

              const url = `http://localhost:5000/files/${data}`;
              window.open(url, '_blank');

            } else {
              console.error('Error fetching PDF: Response data or attachment is null');
            }
  
          } catch (error) {
            console.error('Error fetching PDF:', error);
          }


        };



        // download pdf
        const handleDownload = async (data) => {
          const url = `http://localhost:5000/files/${data}`;
        
          // Fetch the PDF data
          const response = await fetch(url);
          const blob = await response.blob();
        
          // Create a link element and trigger the download
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = pdfData; // Set the desired file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        };

 




      const getSubmittedAssignments = async () => {
// alert('hi')
        const id = '65ad2cda37e1038743c9b06b';
                 
        try {
          const response = await axios.get(`http://localhost:5000/student/getSubmitted/${id}`);
          const data =  response.data.data
            //   setAssignments();
              setAssignments(data);
              // console.log(assignments)
      if(response.data.success){
        alert('Assignment Retrieved Succesfully!')
        window.location.reload()
      }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };


  
      useEffect(() => {
        getSubmittedAssignments();
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
                    {/* <button onClick={handleFilter}
                                class="w-full mt-9 ml-2 px-4 py-1 font-semibold text-slate-900 bg-slate-200 rounded-full hover:bg-green-500 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                type="button">
                                Filter
                            </button> */}
                    </div>
              </div>
  <div className="px-4 py-4">
   
      <table class="min-w-full border border-gray-300 rounded-xl">
          <thead className='bg-indigo-500 rounded-xl'>
            <tr>
              <th class="py-2 px-4 border-b">S.No</th>
              <th class="py-2 px-4  border-b">Assignment Name</th>
              <th class="py-2 px-4  border-b">Description</th>
              <th class="py-2 px-4  border-b">Section</th>
              <th class="py-2 px-4  border-b">Attachment</th>
              <th class="py-2 px-4  border-b">Action</th>
            </tr>
          </thead>
          <tbody>

            {assignments.map((assignment, index) => {
              // fetchPdfData(assignment.assignmentId)
              // Parse the original date string
              const originalDate = new Date(assignment.assignmentDetails.dueDate);

              // Get the date in the desired format (YYYY-MM-DD)
              const formattedDueDate = originalDate.toLocaleDateString('en-GB'); // 'en-GB' represents the format 'dd-mm-yyyy'

              return (
                <tr className='text-center hover:bg-slate-900' key={index}>
                  <td class="py-2 px-4 border-b ">{index + 1}</td>
                  <td class="py-2 px-4 border-b">{assignment.assignmentDetails.name}</td>
                  <td class="py-2 px-4 border-b">{assignment.assignmentDetails.description}</td>
                  <td class="py-2 px-4 border-b">{assignment.marks ? assignment.marks : 'Not Evaluated!'}</td>
                  <td class="py-2 px-4 border-b">
                        <DownloadIcon className='hover:cursor-pointer hover:text-green-500'  onClick={() => fetchPdfData(assignment._id)} />
                        <RemoveRedEyeIcon className='hover:cursor-pointer hover:text-green-500' onClick={() => handleViewAttachment(assignment._id)} />
                  </td>
                  <td class="py-2 px-4 border-b">
                    <Link to={`editAssignment/${assignment._id}`}>Edit</Link>
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

export default ViewSubmitted