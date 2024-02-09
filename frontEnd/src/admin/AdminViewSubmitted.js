import React, {useEffect, useState} from 'react'
import Header from "../student/Header";
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DownloadIcon from '@mui/icons-material/Download';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Badge from '@mui/material/Badge';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


function AdminViewSubmitted() {

  const [assignments, setAssignments] = useState([]);
  const [toEvaluate, setEvaluate] = useState([]);

  const [classes, setClass] = useState('all');
	const [section, setSection] = useState('all');
  const [pdfData, setPdfData] = useState('');
  const [open, setOpen] = useState(false);


  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [completedId, setCompletedId] = useState();
  const [stdDno, setStdDno] = useState();
  const [stdName, setStdName] = useState();
  const [stdClass, setStdClass] = useState();
  const [stdSection, setStdSection] = useState();
  const [assignmentName, setAssignmentName] = useState();
  const [marks, setMarks] = useState();
  const [feedback, setFeedback] = useState();





  const handleClass = (event) => {
    setClass(event.target.value);
    };
  
  const handleSection = (event) => {
    setSection(event.target.value);
    };


    const handleMarks = (event) => {
      setMarks(event.target.value);
      };
    
    const handleFeedback = (event) => {
      setFeedback(event.target.value);
      };


    const getSubmittedById = async (completedId) => {
      // alert(completedId)


                       
              try {
                const response = await axios.get(`http://localhost:5000/admin/getSubmittedById/${completedId}`);
                const data =  response.data.data
                    setEvaluate();
                    setEvaluate(data);
                    setCompletedId(data._id)
                    setStdName(data.studentDetails.name)
                    setStdDno(data.studentDetails.dNo)
                    setStdSection(data.studentDetails.section)
                    setStdClass(data.studentDetails.classes)

                    setAssignmentName(data.assignmentDetails.name)

                    // console.log(data)

                    setOpen(true)
                  
              } catch (error) {
                console.error('Error uploading file:', error);
              }
            };
      

            


      const fetchPdfData = async (assignmentId) => {
        // alert(assignmentId)
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



      const handleEvaluation = async (completedId) => {
      // alert(completedId)

        const formData = new FormData();
        formData.append('marks', marks);
        formData.append('feedback', feedback);
        formData.append('completedId', completedId);

  
      console.log(formData)
    
        try {
          const response = await axios.put('http://localhost:5000/admin/evaluate', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      if(response.data.success){
        alert('Assignment Evaluated Succesfully!')
        window.location.reload()
      }
        } catch (error) {
          console.error('Error Evaluation Assignment', error);
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
                 
        try {
          const response = await axios.get('http://localhost:5000/admin/getAllSubmitted');
          const data =  response.data.data

          //   setAssignments();
              setAssignments(data);
              console.log(data)
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


    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      // height: 300,
      // bgcolor: 'background.paper',
      // boxShadow: 24,
    };
  



  return (
    <div className='h-full'>

<Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        
        <Box sx={style}>


                    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 shadow-lg">
                        <div class="mx-auto max-w-lg bg-white rounded-xl p-3">
                            <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mt-4">Evaluate Assignment!</h1>

                            <div className='flex justify-between gap-1 mt-8 ml-4 mr-10 text-2xl text-indigo-600 lg:ml-10'>
                                <h1 className=''>{stdName} </h1>
                                <h1>{stdClass} - {stdSection}</h1>
                            </div>

                            <p class="mx-auto mt-2 max-w-md ml-4 text-gray-600 lg:ml-10">{assignmentName}</p>

                            <form action="" class="mb-0 space-y-4 rounded-lg  shadow-lg p-6 lg:px-8 px-2">

                            <div>
                                <input
                                    type="text"
                                    class="w-full rounded-lg border-blue-400 hover:border-blue-500 p-3 pe-12 text-sm shadow-sm text-slate-800"
                                    placeholder="Enter Marks"  onChange={handleMarks} value={marks}
                                />

                            </div>

                            <div>

                                <div class="relative">
                                <input
                                    type="text"
                                    class="w-full rounded-lg border-blue-400 hover:border-blue-500 p-3 pe-12 text-sm shadow-sm text-slate-800"
                                    placeholder="Enter Feedback" onChange={handleFeedback} value={feedback}
                                />


                                </div>
                            </div>

                            <div className='flex justify-between gap-1'>
                              <button
                                  type="submit" onClick={()=>handleEvaluation(completedId)}
                                  class="block w-full rounded-lg bg-indigo-600 px-2 py-2 text-sm font-bold text-white"
                              >Submit</button>
                              <button
                                  type="button" onClick={handleClose}
                                  class="block w-full rounded-lg bg-red-300 px-2 py-2 font-bold  text-red-900"
                              >
                                  Cancel
                              </button>
                            </div>
                            </form>
                        </div>
                        </div>
        </Box>
      </Modal>


        <Header/>
          <section className="py-10 text-white bg-slate-950 md:h-full ">
            {/* <div className='flex justify-end mx-4'>
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
              </div> */}
  <div className="px-4 py-4">

    {assignments.length !== 0 ? (
    
        <table class="min-w-full border border-gray-300 rounded-xl">
            <thead className='bg-indigo-500 rounded-xl'>
              <tr>
                <th class="py-2 px-4 border-b">S.No</th>
                <th class="py-2 px-4  border-b">Assignment Name</th>
                <th class="py-2 px-4  border-b">Description</th>
                <th class="py-2 px-4  border-b">Section</th>
                <th class="py-2 px-4  border-b">Attachment</th>
                <th class="py-2 px-4  border-b">Evaluate</th>
              </tr>
            </thead>
            <tbody>

              { assignments.map((assignment, index) => {
            
                return (
                  <tr className='text-center hover:bg-slate-900' key={index}>
                    <td class="py-2 px-4 border-b ">{index + 1}</td>
                    <td class="py-2 px-4 border-b">{assignment.assignmentDetails ? assignment.assignmentDetails.name : '-'}</td>
                    <td class="py-2 px-4 border-b">{assignment.assignmentDetails ? assignment.assignmentDetails.description : '-'}</td>
                    <td class="py-2 px-4 border-b">{assignment.marks ? assignment.marks : 'Not Evaluated!'}</td>
                    <td class="py-2 px-4 border-b">
                          <DownloadIcon className='hover:cursor-pointer hover:text-green-500'  onClick={() => fetchPdfData(assignment._id)} />
                          <RemoveRedEyeIcon className='hover:cursor-pointer hover:text-green-500' onClick={() => handleViewAttachment(assignment._id)} />
                    </td>

                    <td class="py-2 px-4 border-b">
                          <CheckIcon className='hover:cursor-pointer hover:text-green-500'  onClick={() => getSubmittedById(assignment._id)} />
                    </td>
                   
                  </tr>
                );
              })}

              
            </tbody>
      </table>

    ) :  (
      <div className='flex flex-col items-center justify-center mt-10'>
        
          <SentimentVeryDissatisfiedOutlinedIcon  className='text-green-500' style={{fontSize:'50px',padding:'0px'}}/><br></br>
          <h1 className='text-2xl font-semibold text-indigo-500 md:text-4xl'>No Submitted Assignments Found!  </h1>
          <Badge badgeContent={assignments.length} color="info">
<a className="block w-full px-12 py-3 my-8 text-sm font-medium text-white border border-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/viewAssignments"> View Assignments
        </a>
          </Badge>
      </div>
    ) }
  </div>
</section>
    </div>
  )
}

export default AdminViewSubmitted