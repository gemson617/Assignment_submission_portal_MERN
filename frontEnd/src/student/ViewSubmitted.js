import React, {useEffect, useState} from 'react'
import Header from "../student/Header";
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DownloadIcon from '@mui/icons-material/Download';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Badge from '@mui/material/Badge';
import SubmittedTable from "../student/SubmittedTable";
import { getSubmittedAssignmentsApi } from './ApiUtils';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'


function ViewSubmitted() {

  const [assignments, setAssignments] = useState([]);
  // const [assignmentId, setAssignmentId] = useState(null);
  const [classes, setClass] = useState('all');
	const [section, setSection] = useState('all');
  const [pdfData, setPdfData] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClass = (event) => {
    setClass(event.target.value);
    };
  
  const handleSection = (event) => {
    setSection(event.target.value);
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

      useEffect(() => {

        if (pdfData !== '') {
          // alert(pdfData);
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

 




      const getSubmittedAssignments = async (setAssignments, navigate, dispatch) => {
        
        getSubmittedAssignmentsApi(setAssignments, navigate, dispatch);

      };


  
      useEffect(() => {
        getSubmittedAssignments(setAssignments, navigate, dispatch);
    }, []);





    const columns = React.useMemo(
      () => [
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Age',
          accessor: 'age',
        },
        // Add more columns as needed
      ],
      []
    );
  
    const data = React.useMemo(
      () => [
        {
          name: 'John Doe',
          age: 30,
        },
        {
          name: 'Jane Smith',
          age: 25,
        },
        // Add more rows as needed
      ],
      []
    );




  return (
    <div className='h-screen'>
          <section className="h-full py-10 text-white bg-slate-950 ">

          <h1 class="py-2 px-4 text-2xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-3xl duration-200">
         Submitted Assignments
    </h1>
    
  <div className="px-4 py-4">

    {assignments.length !== 0 ? (
    
        <table class="border border-gray-300 rounded-xl  md:w-full ">
            <thead className='bg-indigo-500 rounded-xl'>
              <tr>
                <th class="py-2 px-4 border-b">S.No</th>
                <th class="py-2 px-4  border-b">Assignment Name</th>
                <th class="py-2 px-4  border-b">Description</th>
                <th class="py-2 px-4  border-b">Marks</th>
                <th class="py-2 px-4  border-b">Attachment</th>
              </tr>
            </thead>
            <tbody>

              { assignments.map((assignment, index) => {
            
                return (
                  <tr className='text-center hover:bg-slate-900' key={index}>
                    <td class="py-2 px-4 border-b ">{index + 1}</td>
                    <td class="py-2 px-4 border-b">{assignment.assignmentDetails.name}</td>
                    <td class="py-2 px-4 border-b">{assignment.assignmentDetails.description}</td>
                    <td class="py-2 px-4 border-b">{assignment.is_evaluated ? assignment.marks : 'Not Evaluated!'}</td>
                    <td class="py-2 px-4 border-b">
                          <DownloadIcon className='hover:cursor-pointer hover:text-green-500'  onClick={() => fetchPdfData(assignment._id)} />
                          <RemoveRedEyeIcon className='hover:cursor-pointer hover:text-green-500' onClick={() => handleViewAttachment(assignment._id)} />
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

{/* <SubmittedTable columns={columns} data={data} /> */}

  </div>
</section>

    </div>
  )
}

export default ViewSubmitted