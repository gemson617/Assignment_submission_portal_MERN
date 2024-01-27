import React, { useState, useEffect, useRef, useReducer } from "react";

import "../index.css";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';


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

function ViewAssignments() {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [file, setFile] = useState(null);
    const [comments, setComments] = useState('');
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
  
    const handleCommentsChange = (event) => {
      setComments(event.target.value);
    };
    
    const handleUpload = async () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('comments', comments);
  
      try {
        const response = await axios.post('http://localhost:5000/student/submitAssignment', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };


    const handleId = () => setAssignmentId('65ab40b88a3bd34294c16aec');

    const [pdfData, setPdfData] = useState(null);
    const [assignmentId, setAssignmentId] = useState(null);

    const [assignments, setAssignments] = useState([]);
// console.log(assignments)

const getAssignments = async () => {

  const id = '65ad2cda37e1038743c9b06b';
           
  try {
    const response = await axios.get(`http://localhost:5000/student/getAssignments/${id}`);
    const data =  response.data.data
        // setAssignments();
        setAssignments(data);
        console.log(assignments)
if(response.data.success){
  alert('Assignment Retrieved Succesfully!')
  window.location.reload()
}
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};


  useEffect(() => {
      getAssignments();
  }, []);






    // useEffect(() => {
    //   const fetchPdfData = async () => {
    //     try {
    //       const response = await axios.get(`http://localhost:5000/student/getAssignmentPDF/${assignmentId}`);
    //       const data =  response.data.data.attachment
    //       setPdfData(data);
    //       // console.log(data)
    //     } catch (error) {
    //       console.error('Error fetching PDF:', error);
    //     }
    //   };
  
    //   fetchPdfData();
    // }, [assignmentId]);

    // open pdf

    // const handleDownload = async () => {
    //   const url = `http://localhost:5000/files/${pdfData}`;
    //   window.open(url, '_blank');
    // };


    // download pdf
    const handleDownload = async () => {
      const url = `http://localhost:5000/files/${pdfData}`;
    
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
    
    

    
  return (
    <div>
       
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        
        <Box sx={style}>


                    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 shadow-lg">
                        <div class="mx-auto max-w-lg bg-white rounded-xl p-3">
                            <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mt-4">Submit Assignment!</h1>

                            <h1 className='mt-8 ml-4 text-2xl text-indigo-600 lg:ml-10'>Assignment Name</h1>
                            <p class="mx-auto mt-2 max-w-md ml-4 text-gray-600 lg:ml-10">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti
                            inventore quaerat mollitia?
                            </p>

                            <form action="" class="mb-0 space-y-4 rounded-lg  shadow-lg p-6 lg:px-8 px-2">

                            <div>
                                <label for="email" class="sr-only">Email</label>

                                <div class="relative">
                                {/* <input
                                    type="file"
                                    class="w-full rounded-lg border-gray-200 text-indigo-600  p-3 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                /> */}

                          <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} className='w-full bg-indigo-500'>
                                Upload Assignment
                                <VisuallyHiddenInput type="file" name='file'  onChange={handleFileChange}/>
                              </Button>

                                </div>
                            </div>

                            <div>
                                <label for="password" class="sr-only">Comments</label>

                                <div class="relative">
                                <input
                                    type="text"
                                    class="w-full rounded-lg border-gray-200 p-3 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Comments" onChange={handleCommentsChange}
                                />


                                </div>
                            </div>

                            <div className='flex justify-between gap-1'>
                              <button
                                  type="submit" onClick={handleUpload}
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

      <Button onClick={handleOpen}>Open modal</Button>
      <Button onClick={getAssignments}>Get Assignments</Button>

      <a
          className="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="#" onClick={handleId}
        >
           View Assignments
        </a>
        <Button onClick={handleDownload}>Download PDF</Button>



        {pdfData && (
  <embed
    src={URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))}
    type="application/pdf"
    width="100%"
    height="600px"
  />
)}



{/* main div for assignment cards */}
<div className=''>

          <h1 className="mx-20 my-5 text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-4xl">
                  Assignments For You.
          </h1>


          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 md:mx-20 my-20">

                {assignments ?   (

                    assignments.map((assignment, index) => {
                      
                      const originalDate = new Date(assignment.dueDate);

                      const formattedDueDate = originalDate.toLocaleDateString('en-GB').replace(/\//g, '-'); // 'en-GB' represents the format 'dd-mm-yyyy'
                      const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
                      // alert(today)
                     
                     
                      return(
                            <article key={index} class="p-0.5 m-1  overflow-hidden transition duration-300 transform bg-indigo-400 cursor-pointer group rounded-xl hover:bg-indigo-500 hover:scale-105 hover:shadow-lg"
                              title="click to submit" onClick={handleOpen}>
                                  <div class="rounded-[10px] p-4 sm:p-6">

                                            {/* due date */}
                                            <h2 class="mt-1 text-2xl uppercase text-slate-900">
                                              {assignment.name}
                                            </h2>
                                            
                                            {/* description */}
                                            <a href="#">
                                              <h3 class="mt-2 text-lg font-medium text-gray-900">
                                                    {assignment.description}
                                              </h3>
                                            </a>
                                            
                                            {/* DueDate */}

                                            <div class="mt-6 flex flex-wrap justify-between">
                                                  <span class="whitespace-nowrap rounded-full bg-purple-200 px-2.5 py-0.5 text-xs text-purple-600">
                                                    Snippett
                                                </span>

                                                <span class={`whitespace-nowrap rounded-full  px-2.5 py-0.5 text-xs  ${formattedDueDate === today ? 'bg-red-200 text-red-600' : 'bg-purple-200 text-purple-600'}`}>
                                                    Due Date - {formattedDueDate === today ? 'Today' : formattedDueDate }
                                                  </span>
                                            </div>
                            
                                  </div>
                            </article> 
                            
                            )
                    })
                      

                      )  :  ' ' }









          </div>

</div>


    </div>
  )
}

export default ViewAssignments