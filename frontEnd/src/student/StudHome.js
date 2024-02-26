import React, { useState, useEffect, useRef, useReducer } from "react";
import Header from "./Header";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartRounded';
import axios from 'axios';
import { getAssignmentsApi } from './ApiUtils';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux'
import {setTokenAlert, mismatchAlert } from './states/ErrorSlice'


function StudHome() {

  const [assignments, setAssignments] = useState([]);
  const [student, setStudent] = useState([]);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const tokenAlert = useSelector((state) => state.ErrorSlice.tokenAlert)

  const getAssignments = async (setAssignments,setStudent,navigate,dispatch) => {
    
    getAssignmentsApi(setAssignments,setStudent, navigate, dispatch);


  };
  
  
    useEffect(() => {
        getAssignments(setAssignments,setStudent,navigate,dispatch);
    }, []);

    // const handleIncrement = () =>{
    //   dispatch(setTokenAlert())
    // };

  return (
    <div>
      {/* <Header/> */}
      
      <section className="text-white bg-slate-950">
  <div className="h-screen max-w-screen-xl px-4 py-12 mx-auto lg:flex ">
    <div className="max-w-3xl mx-auto text-center ">
    <img
    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    alt=""
    className="object-cover w-20 mx-auto rounded-full justify-self-center aspect-square"
  />
    <h1 class="text-3xl font-bold text-white mb-10">Welcome, {student.name  }!</h1>

      <h1
        className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text sm:text-4xl"
      >
        Keep Track Of Your Assignments.

        <span className="block"> Accelerate Your Grades. </span>
      </h1>
 

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {/* <a
          className="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/get-started"
        >
          View Assignments
        </a> */}

        
           <Badge badgeContent={assignments.length} color="info">
<a className="block w-full px-12 py-3 text-sm font-medium text-white border border-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/viewAssignments"> View Assignments
        </a>
          </Badge>

          <a className="block px-8 py-3 text-sm font-medium text-white border border-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/ViewSubmitted"> Submitted Assignments
        </a>
          
      </div>
    </div>
  </div>
</section>

</div>
  )
}

export default StudHome